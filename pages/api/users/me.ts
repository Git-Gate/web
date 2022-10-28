import {createHandler, Get, Req} from "next-api-decorators";
import type {NextApiRequest} from "next";
import {JwtAuthGuard} from "../../../lib/middlewares";
import {User} from "../../../lib/db/interfaces/user";
import {connect} from "../../../lib/db";

class UserMeHandler {
  @Get()
  @JwtAuthGuard()
  public async userMe(@Req() req: NextApiRequest) {
    await connect();
    const user = req.user as User;
    delete user?.githubToken;
    return user;
  }
}

export default createHandler(UserMeHandler);
