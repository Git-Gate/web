import {createHandler, Get} from 'next-api-decorators';
import {JwtAuthGuard} from "../../../lib/middlewares";

class CheckHandler {
    @Get('/')
    @JwtAuthGuard()
    public async check() {
        return {
            message: "OK"
        };
    }
}

export default createHandler(CheckHandler);