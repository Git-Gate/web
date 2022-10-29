import {createHandler, Get, NotFoundException, Req} from "next-api-decorators";
import type {NextApiRequest} from "next";
import {connect} from "../../../lib/db";
import {RepositoryModel} from "../../../lib/db/models/repository";

class GetRepositoryHandler {
  @Get()
  public async getRepository(@Req() req: NextApiRequest) {
    await connect();
    const {id} = req.query;
    const repository = await RepositoryModel.findById(id);
    if (!repository) {
      throw new NotFoundException("Repository not found.");
    }
    return repository;
  }
}

export default createHandler(GetRepositoryHandler);
