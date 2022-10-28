import {createHandler, Get} from "next-api-decorators";

class CheckHandler {
  @Get("/")
  public async check() {
    return {
      message: "OK",
    };
  }
}

export default createHandler(CheckHandler);
