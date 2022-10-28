import {connect} from "../../../lib/db";
import {UserModel} from "../../../lib/db/models/user";
import {
  Body,
  createHandler,
  Post,
  Req,
  UnauthorizedException,
  ValidationPipe,
} from "next-api-decorators";
import {IsEmpty, IsString} from "class-validator";
import {createOAuthAppAuth} from "@octokit/auth-oauth-app";
import {JwtAuthGuard} from "../../../lib/middlewares";
import type {NextApiRequest} from "next";
import {GithubClient} from "../../../lib/github-client";

export class GithubDTO {
  @IsString()
  code!: string;
}

class GithubHandler {
  @Post("/")
  @JwtAuthGuard()
  public async signup(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: GithubDTO
  ) {
    const {code} = body;
    const auth = createOAuthAppAuth({
      clientType: "oauth-app",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    });
    const userAuthenticationFromWebFlow = await auth({
      type: "oauth-user",
      code,
      state: process.env.GITHUB_CLIENT_STATE as string,
    });
    if (!userAuthenticationFromWebFlow.token) {
      throw new UnauthorizedException("Invalid code");
    }
    await connect();

    const user = req.user;
    const githubToken = userAuthenticationFromWebFlow.token;
    const githubClient = new GithubClient(userAuthenticationFromWebFlow.token);
    const githubUser = await githubClient.getAuthenticatedUser();
    await UserModel.updateOne(
      {_id: user!._id},
      {
        $set: {
          githubUsername: githubUser.name,
          githubToken, // TODO: encrypt
          avatarUrl: githubUser.avatar_url,
        },
      }
    );
    return {message: "OK"};
  }
}

export default createHandler(GithubHandler);
