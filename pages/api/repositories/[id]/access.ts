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
    const repository = (await RepositoryModel.findById(id)) as Repository;
    if (!repository) {
      throw new NotFoundException("Repository not found.");
    }
    if (repository.memberAddresses.includes(user.address)) {
      console.error("ALREADY COLLABORATOR");
      // throw new BadRequestException(
      //  "User is already a collaborator in repository " + id
      // );
    }
    /* const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.GIT_GATE_WALLET_PVT_KEY as string,
      "mumbai"
    );
    const repositoryPOGMContract = await sdk.getContract(
      repository.soulboundNFTContractAddress as string,
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
    }*/
    const pvtkey =
      "-----BEGIN RSA PRIVATE KEY-----\n" +
      "MIIEpgIBAAKCAQEAtl22C3x8sfCuRuRO7ASVX+tD8SaI7xyqv/8sveuHAMTvPgbs\n" +
      "XtsSTe7kTLuHX9RNuuLpn9X2ZOt3203s5oRKyljnOgm1J/vJJ0ZRovGZ2KaLWfZz\n" +
      "N/EA0FpR4JWsso66OyPtQQFyQLtgFRdM/2/Atum5zuuxJTC+ERC8ZuSA7nhjn+GI\n" +
      "YJ/NKo1Zt8Xh2bG/nFeVnqOFAO7ndTF4ARaNxHyXv2L6TilN2fCz3u89gW4UfqGD\n" +
      "3Blph8x8Kbg+zKmw5+xlGZEIB5A1h0CreSNzQROGnXwdGPvlLnP6N3FcS+LGWuE2\n" +
      "GSK4m8uQApELrxMWEPqHCIFjwapB1+hYQyLDcwIDAQABAoIBAQCXQCPjZO0628Z/\n" +
      "b43xfF+zfToNgQtjXeBUezxNjFGdFrjiNfXHOmT1FCRva718gmWxkc94TIod65mt\n" +
      "3vSTv7cUGiY04aZJMjAEjfLZdQ5HPOIozBmFlTI6nB56aUkhkvTsZgC5wIxVGdM3\n" +
      "yuqGlNY+Hp2H+70hfkq1dq77m5s/rFz+YZqKc8AACfAjb3x5qwEPjZTFJiojaqeY\n" +
      "1sEw6067iclTQA4onSBGCq/4jXtLVsLcMtIk5okj2pDUsyxQ8Jg8Q6Lk37f3pYdt\n" +
      "gKBEzXEBVCIyC/NvacFHnzNxZn1nIfjAMApNgnWI4voZts2RI3Pduw82bp8PiB9a\n" +
      "O+pw7kLBAoGBAOM+jhyCfXm9sSY0Tt90CumGsC/WoQaC2/zncmq6BpdA1WU1dyOQ\n" +
      "tmFnEzng6MIcYGa39hVy1IDzU+PIf2Gula1JKf6gBJI8eqSa2KqFcnZyjmZlboUk\n" +
      "lESzA6ppo0SoUMbpx5AaOYS8x6sZz3NjaSLrsDfNIaWl8Tg0jpqQ9vwhAoGBAM1x\n" +
      "WbWTUpW4l/vk3Wey79k5L6eXoGIkPsmpubX5VaQbpjuIxTA/CEyrLh4HLJ4okMPf\n" +
      "4L1aZa8FGiMs+f4qXJiAajV9nqedx07eYVrGWNN6wFISNGLAV43JjFIK/qt/34V1\n" +
      "MagUX+Egzb70XcUTj5bRqyNacyw+6KA0DD0I9G0TAoGBAMhJ43GnZbZ+hfvZUMdM\n" +
      "fS204+dWMdkOT50J1ePRkGuR3kP1KsvzCXyyH9T8scocvq7qZ4AiFMCPNxpmJjfP\n" +
      "a+cuvE/LdBv8KFCalms9cVSKxY3kytOZGQGwEoQJ1bh27bNUa+tL4fRne0kIV7sp\n" +
      "HIqF12xnZcedig1y7Vm4eahhAoGBAItRce+Tj26e9tpIUujOzJ43jJyPU6EaSUYC\n" +
      "hkDka/JVGb7HuklEhYFQmH6eiOBcTAe427QtCEXPJPFzv7hfy9lTRDMwFBZBBfbz\n" +
      "EXw4g+YuGRvO4p2RKA6r/i9o61kr502esuTzpC2MTFpRZwGNiVNSrkbUQMRhiOmT\n" +
      "QjVlzDPnAoGBANJ5MPMc9tyqJMXM2/eL7zAb6NsWjDtFIPmbCGWyFlzIM6rlVFpj\n" +
      "BUjoteGItt9uS29x/0zS/o7dpJoZTo380h26u2OQdOHjlZqYOdm0yw3PBEaZpdFZ\n" +
      "zX1Z9tjwvzm3eWKKufqdyEJ96xBSM+pbm+a5ygM8CkO/rDCIgp6HyS9O\n" +
      "-----END RSA PRIVATE KEY-----\n";
    const appAuth = createAppAuth({
      appId: process.env.GITGATE_GITHUB_APP_ID as string,
      privateKey: pvtkey,
      clientId: process.env.GITGATE_GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITGATE_GITHUB_APP_CLIENT_SECRET as string,
    });
    const appAuthentication = await appAuth({type: "app"});
    const githubClient = new GithubClient(appAuthentication.token);
    const checkCollaborator = await githubClient.checkCollaborator(
      repository.githubOwner,
      repository.name,
      user.githubLogin as string
    );
    if (!checkCollaborator) {
      console.error("USER ALREADY COLLAB ON GITHUB");
      throw new BadRequestException("User is already a collaborator");
    }
    await githubClient.addCollaborator(
      repository.githubOwner,
      repository.name,
      user.githubLogin as string
    );
    return {message: "OK"};
  }
}

export default createHandler(RepositoryAccessHandler);
