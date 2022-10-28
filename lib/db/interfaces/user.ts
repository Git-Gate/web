import {Base} from "./base";

export interface User extends Base {
  address: string;
  ensLabel?: string;
  avatarUrl?: string;
  bio?: string;
  githubName?: string;
  githubLogin?: string;
  githubToken?: string;
}
