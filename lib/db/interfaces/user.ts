import {Base} from "./base";

export interface User extends Base {
  address: string;
  ensLabel?: string;
  avatarUrl?: string;
  githubId?: string;
  githubUsername?: string;
  githubToken?: string;
  bio?: string;
}
