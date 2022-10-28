import {Base} from "./base";

export interface User extends Base  {
    address: string,
    ensLabel: string,
    avatarUrl: string,
    githubUsername: string,
    githubToken: string,
    bio: string
}