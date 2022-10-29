import nodeHtmlToImage from "node-html-to-image";
import {join, resolve} from "path";
import {readFileSync} from "fs";

export const generateRepositoryNFTImage = async (
  repositoryName: string
): Promise<Buffer> => {
  const templateDirectory = resolve(process.cwd(), "public");
  const templateFile = readFileSync(
    join(templateDirectory, "assets", "repository-nft-template.handlebars"),
    "utf8"
  );
  return (await nodeHtmlToImage({
    type: "jpeg",
    html: templateFile,
    quality: 100,
    content: {
      repositoryName,
    },
    puppeteerArgs: {
      defaultViewport: {
        width: 600,
        height: 600,
        deviceScaleFactor: 2,
      },
    },
  })) as Buffer;
};
