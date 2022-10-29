import {Octokit} from "@octokit/rest";
export class GithubClient {
  private client;

  constructor(token: string) {
    this.client = new Octokit({
      auth: token,
    });
  }

  async getAuthenticatedUser() {
    const {data} = await this.client.users.getAuthenticated();
    return data;
  }

  async getAuthenticatedUserRepositories(
    affiliation?: "owner" | "collaborator" | "organization_member"
  ) {
    const {data} = await this.client.repos.listForAuthenticatedUser(
      affiliation
        ? {
            affiliation,
          }
        : {}
    );
    return data;
  }

  async getRepository(owner: string, repo: string) {
    const {data} = await this.client.repos.get({owner, repo});
    return data;
  }

  async getRepositoryInstallation(owner: string, repo: string) {
    const {data} = await this.client.apps.getRepoInstallation({owner, repo});
    return data;
  }

  async addCollaborator(owner: string, repo: string, username: string) {
    const {data} = await this.client.repos.addCollaborator({
      owner,
      repo,
      username,
      permission: "push",
    });
    return data;
  }

  async checkCollaborator(owner: string, repo: string, username: string) {
    const {data} = await this.client.repos.checkCollaborator({
      owner,
      repo,
      username,
    });
    return data;
  }

  async addRepositoryToInstallation(repoId: number, installationId: number) {
    const {data} =
      await this.client.apps.addRepoToInstallationForAuthenticatedUser({
        repository_id: repoId,
        installation_id: installationId,
      });
    return data;
  }
}
