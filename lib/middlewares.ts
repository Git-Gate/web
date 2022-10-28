import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from "next-api-decorators";
import {NextApiRequest, NextApiResponse} from "next";
import {verifyTokenAndGetUser} from "../pages/api/auth/utils";
import mongoose from "mongoose";

export const JwtAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.includes("Bearer ")) {
      throw new UnauthorizedException();
    }
    try {
      const token = authorization.replace("Bearer ", "");
      req.user = await verifyTokenAndGetUser(token);
      next();
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    next();
  }
);
