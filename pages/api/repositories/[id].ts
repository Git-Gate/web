import {
  BadRequestException,
  createHandler,
  Get,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
} from "next-api-decorators";
import type {NextApiRequest} from "next";
import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {ethers} from "ethers";
import {connect} from "../../../lib/db";
import {RepositoryModel} from "../../../lib/db/models/repository";
import {User} from "../../../lib/db/interfaces/user";
import {JwtAuthGuard} from "../../../lib/middlewares";
import {GithubClient} from "../../../lib/github-client";
import {Repository} from "../../../lib/db/interfaces/repository";

class RepositoriesHandler {
  @Get()
  public async getRepository(@Req() req: NextApiRequest) {
    await connect();
    const {id} = req.query;
    const repository = await RepositoryModel.findById(id);
    if (!repository) {
      throw new NotFoundException("Repository not found.");
    }
    return repository;
  }
  @Post("/collaborators")
  @JwtAuthGuard()
  public async inviteCollaborator(@Req() req: NextApiRequest) {
    await connect();
    const {id} = req.query;
    const user = req.user as User;
    const repository = (await RepositoryModel.findById(id)) as Repository;
    if (!repository) {
      throw new NotFoundException("Repository not found.");
    }
    if (repository.memberAddresses.includes(user.address)) {
      throw new BadRequestException(
        "User is already a collaborator in repository " + id
      );
    }
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.GIT_GATE_WALLET_PVT_KEY as string,
      "mumbai"
    );
    const repositoryPOGMContract = await sdk.getContract(
      repository.contractAddress as string
    );
    const balance = await repositoryPOGMContract.call("balanceOf");
    if (balance > 0) {
      const githubClient = new GithubClient(
        process.env.GITGATE_GITHUB_APP_PVT_KEY as string
      );
      const checkCollaborator = await githubClient.checkCollaborator(
        repository.githubOwner,
        repository.name,
        user.githubLogin as string
      );
      if (!checkCollaborator) {
        throw new BadRequestException("User is already a collaborator");
      }
      await githubClient.addCollaborator(
        repository.githubOwner,
        repository.name,
        user.githubLogin as string
      );
      return {message: "OK"};
    }
    throw new UnauthorizedException("User already owns a");
  }
}

export default createHandler(RepositoriesHandler);
