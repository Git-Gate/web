import {
  Body,
  createHandler,
  Post,
  Req,
  UnauthorizedException,
  ValidationPipe,
} from "next-api-decorators";
import {IsString} from "class-validator";
import {createOAuthAppAuth} from "@octokit/auth-oauth-app";
import type {NextApiRequest} from "next";
import {JwtAuthGuard} from "../../../lib/middlewares";
import {UserModel} from "../../../lib/db/models/user";
import {connect} from "../../../lib/db";
import {GithubClient} from "../../../lib/github-client";
import {User} from "../../../lib/db/interfaces/user";

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

    const user = req.user as User;
    const githubToken = userAuthenticationFromWebFlow.token;
    const githubClient = new GithubClient(userAuthenticationFromWebFlow.token);
    const githubUser = await githubClient.getAuthenticatedUser();
    await UserModel.updateOne(
      {_id: user._id},
      {
        $set: {
          githubName: githubUser.name,
          githubLogin: githubUser.login,
          bio: githubUser.bio,
          githubId: githubUser.id,
          githubToken, // TODO: encrypt
          avatarUrl: githubUser.avatar_url,
        },
      }
    );
    return {message: "OK"};
  }
}

export default createHandler(GithubHandler);
