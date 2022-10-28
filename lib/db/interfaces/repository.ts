import {Base} from "./base";

export interface Repository extends Base {
    name: string;
    githubId: string;
    description: string;
    userId: string;
    owner: string;
    requirements: RepositoryTokenRequirement[];
    blacklistedAddresses: string[];
}

export interface RepositoryTokenRequirement {
    type: TokenType;
    address: string;
    amount: number;
    ids: number[];
}

export enum TokenType {
    ERC20 = "erc-20",
    ERC721 = "erc-721",
    ERC1155 = "erc-1155"
 }