import {User} from "../../interfaces/user";
declare module "next" {

  export interface NextApiRequest {
    id?: string;
    requestTime?: Date;
    user?: User;
  }
}
