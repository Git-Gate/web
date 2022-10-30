import {onRepositoryCreate} from "./onRepositoryCreate";

export const repositoriesHook = async (data: any) => {
  if (data.operationType === "insert") {
    return await onRepositoryCreate(data);
  }
};
