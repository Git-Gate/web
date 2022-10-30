import {
  Body,
  createHandler,
  Get,
  NotFoundException,
  Put,
  Req,
  UnauthorizedException,
  ValidationPipe,
} from "next-api-decorators";
import type {NextApiRequest} from "next";
import {IsArray, IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {connect} from "../../../../lib/db";
import {RepositoryModel} from "../../../../lib/db/models/repository";
import {JwtAuthGuard} from "../../../../lib/middlewares";
import {TokenRequirement} from "../index";
import {Repository} from "../../../../lib/db/interfaces/repository";

export class UpdateTokenizedRepositoryDTO {
  @Type(() => TokenRequirement)
  @ValidateNested()
  @IsNotEmpty()
  requirements!: TokenRequirement[];

  @IsArray()
  @IsOptional()
  blacklistedAddresses!: string[];
}

class RepositoriesHandler {
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

  @Put()
  @JwtAuthGuard()
  public async updateRepository(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateTokenizedRepositoryDTO
  ) {
    await connect();
    const {id} = req.query;
    const {requirements, blacklistedAddresses} = body;
    const repository = (await RepositoryModel.findById(id)) as Repository;
    if (!repository) {
      throw new NotFoundException("Repository not found.");
    }
    const user = req.user;
    if (repository.ownerAddress === user?.address) {
      throw new UnauthorizedException(
        "Cannot update a repository that you don't own."
      );
    }
    return RepositoryModel.updateOne(
      {_id: id},
      {
        $set: {
          requirements: requirements.map((r) => ({
            ...r,
            address: r.address.toLowerCase(),
          })),
          blacklistedAddresses: blacklistedAddresses.map((a) =>
            a.toLowerCase()
          ),
        },
      }
    );
  }
}

export default createHandler(RepositoriesHandler);
