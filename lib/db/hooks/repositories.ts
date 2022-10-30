import {onRepositoryCreate} from "./onRepositoryCreate";
import {onRepositoryUpdate} from "./onRepositoryUpdate";

export const repositoriesHook = async (data: any) => {
  if (data.operationType === "insert") {
    return await onRepositoryCreate(data);
  } else if (data.operationType === "update") {
    return await onRepositoryUpdate(data);
  }
};
