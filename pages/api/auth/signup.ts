import dbConnect from '../../../lib/db/index'
import {UserModel} from '../../../lib/db/models/user'
import {recoverPersonalSignature} from "@metamask/eth-sig-util";
import {bufferToHex} from "ethereumjs-util";
import {ethers} from "ethers";
import {getUserAuthToken} from "./utils";
import {Body, createHandler, Post, UnauthorizedException, ValidationPipe} from "next-api-decorators";
import {IsEthereumAddress, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SignupDTO {
    @IsEthereumAddress()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    signature!: string;

    @IsNumber()
    @IsNotEmpty()
    nonce!: number;
}

class SignupHandler {
    @Post('/')
    public async signup(@Body(ValidationPipe) body: SignupDTO) {
        await dbConnect()

        // the address and signed message from the client
        const {address, signature, nonce} = body;

        // verify the signature
        const message = `Hi there. Sign this message to prove you own this wallet. This doesn't cost anything.\n\nSecurity code (you can ignore this): ${nonce}`;

        // compare if the address from request is the same as the address recovered from the signed message
        const recoveredAddress = recoverPersonalSignature({
            signature,
            data: bufferToHex(Buffer.from(message, "utf8")),
        });

        if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
            throw new UnauthorizedException("Authentication Failed.")
        }

        let user = await UserModel.findOne({address: address.toLowerCase()});
        let isNewUser = false;
        if (!user) {
            const serverWeb3 = new ethers.providers.InfuraProvider(
                undefined,
                process.env.INFURA_ID
            );
            const ensLabel = await serverWeb3.lookupAddress(address);
            user = await UserModel.create({address: address.toLowerCase(), ensLabel});
            isNewUser = true;
        }
        const token = getUserAuthToken(user._id)
        return {token, isNewUser};
    }
}

export default createHandler(SignupHandler);