import {createHandler, Get, Req} from "next-api-decorators";
import type {NextApiRequest} from "next";
import {connect} from "../../../lib/db";
import {JwtAuthGuard} from "../../../lib/middlewares";
import {GithubClient} from "../../../lib/github-client";
import {User} from "../../../lib/db/interfaces/user";

class GithubRepositoriesHandler {
  @Get("/")
  @JwtAuthGuard()
  public async getUserGithubRepositories(@Req() req: NextApiRequest) {
    await connect();
    const user = req.user as User;
    const githubClient = new GithubClient(user.githubToken as string);
    const githubRepositories =
      await githubClient.getAuthenticatedUserRepositories("owner");
    return githubRepositories.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      private: repo.private,
      url: repo.url,
    }));
  }
}

export default createHandler(GithubRepositoriesHandler);
