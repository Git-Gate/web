import { Octokit } from "@octokit/rest";
import {Endpoints} from "@octokit/types";
export class GithubClient {
    private client;

    constructor(token: string) {
        this.client = new Octokit({
            auth: token,
        });
    }

    async getAuthenticatedUser() {
        const {data} = (await this.client.users.getAuthenticated());
        return data;
    }
}