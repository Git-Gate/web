import {
  BadRequestException,
  createHandler,
  Get,
  NotFoundException,
  Req,
} from "next-api-decorators";
import {isEthereumAddress} from "class-validator";
import {ethers} from "ethers";
import type {NextApiRequest} from "next";
import {connect} from "../../../../lib/db";
import {UserModel} from "../../../../lib/db/models/user";

class GetUserHandler {
  @Get()
  public async getUser(@Req() req: NextApiRequest) {
    await connect();
    const {addressOrEns} = req.query;
    const isAddress = isEthereumAddress(addressOrEns);
    const serverWeb3 = new ethers.providers.InfuraProvider(
      undefined,
      process.env.INFURA_ID
    );
    const address: string = isAddress
      ? (addressOrEns as string)
      : ((await serverWeb3.resolveName(addressOrEns as string)) as string);
    if (!address) {
      throw new BadRequestException("Invalid address or ENS provided.");
    }
    const user = await UserModel.findOne({address: address.toLowerCase()});
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }
}

export default createHandler(GetUserHandler);
