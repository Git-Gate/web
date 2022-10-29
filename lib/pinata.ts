import * as Stream from "stream";
import pinataSDK, {PinataPinOptions, PinataPinResponse} from "@pinata/sdk";
import PinataClient from "@pinata/sdk";

let pinata: PinataClient;

export function initPinata(apiKey: string, secretKey: string) {
  pinata = new pinataSDK(apiKey, secretKey);
}

export async function uploadToPinata(
  stream: Stream,
  options?: PinataPinOptions
): Promise<PinataPinResponse> {
  if (!pinata) {
    throw new Error("Pinata as not been initialized yet.");
  }
  // @ts-ignore
  if (!stream["path"]) {
    // put fake path to let the SDK work
    // https://github.com/PinataCloud/Pinata-SDK/issues/28
    // @ts-ignore
    stream["path"] = "path.png";
  }
  return await pinata.pinFileToIPFS(stream, options);
}

export async function unpinFromPinata(hashToUnpin: string): Promise<void> {
  if (!pinata) {
    throw new Error("Pinata as not been initialized yet.");
  }
  await pinata.unpin(hashToUnpin);
}
