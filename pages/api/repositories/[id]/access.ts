import {
  BadRequestException,
  createHandler,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Req,
} from "next-api-decorators";
import type {NextApiRequest} from "next";
import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {createAppAuth} from "@octokit/auth-app";
import {App} from "@octokit/app";
import {Octokit} from "@octokit/core";
import {connect} from "../../../../lib/db";
import {RepositoryModel} from "../../../../lib/db/models/repository";
import {User} from "../../../../lib/db/interfaces/user";
import {JwtAuthGuard} from "../../../../lib/middlewares";
import {GithubClient} from "../../../../lib/github-client";
import {Repository} from "../../../../lib/db/interfaces/repository";
import {
  soulboundContractAbi,
  soulboundFactoryContractAbi,
} from "../../../../lib/smart-contract-abis";

class RepositoryAccessHandler {
  @Get()
  @JwtAuthGuard()
  public async inviteCollaborator(@Req() req: NextApiRequest) {
    await connect();
    const {id} = req.query;
    const user = req.user as User;
    const repo = (await RepositoryModel.findById(id)) as Repository;
    if (!repo) {
      throw new NotFoundException("Repository not found.");
    }
    if (repo.memberAddresses.includes(user.address)) {
      throw new BadRequestException(
        "User is already a collaborator in repository " + id
      );
    }
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.GIT_GATE_WALLET_PVT_KEY as string,
      "mumbai"
    );
    const repositoryPOGMContract = await sdk.getContract(
      repo.soulboundNFTContractAddress as string,
      soulboundContractAbi
    );

    repositoryPOGMContract.interceptor.overrideNextTransaction(() => ({
      gasLimit: 3000000,
    }));

    try {
      await repositoryPOGMContract.call("safeMint", user.address);
    } catch (e) {
      throw new InternalServerErrorException(
        "There was an error while minting your soulbound membership NFT. Please check that you fulfill the token requirements specified by the repo owner."
      );
    }
    const app = new App({
      appId: process.env.GITGATE_GITHUB_APP_ID as string,
      privateKey: process.env.GITGATE_GITHUB_APP_PVT_KEY as string,
      oauth: {
        clientId: process.env.GITGATE_GITHUB_APP_CLIENT_ID as string,
        clientSecret: process.env.GITGATE_GITHUB_APP_CLIENT_SECRET as string,
      },
    });
    // cycle over installation and repos to invite user to the correct repository
    for await (const {installation} of app.eachInstallation.iterator()) {
      for await (const {octokit, repository} of app.eachRepository.iterator({
        installationId: installation.id,
      })) {
        if (repository.id === parseInt(repo.githubId)) {
          await octokit.request(
            "PUT /repos/{owner}/{repo}/collaborators/{username}",
            {
              owner: repo.githubOwner,
              repo: repo.name,
              username: user.githubLogin as string,
            }
          );
          /* await RepositoryModel.updateOne(
            {_id: repo._id},
            {memberAddresses: repo.memberAddresses.concat([user.address])}
          );*/
        }
      }
    }
    return {message: "OK"};
  }
}

export default createHandler(RepositoryAccessHandler);
