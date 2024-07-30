import { IUser } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";
import ErrorHandler from "./ErrorHandler";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis
  try {
    // TODO: make redis uncomment it is creating issue
    // [ioredis] Unhandled error event: Error: getaddrinfo ENOTFOUND in-swine-54706.upstash.io
    // at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:109:26)
    //  redis.set(user._id as any, JSON.stringify(user) as any);
  } catch (error) {
    console.error("Error setting Redis key:", error);
    throw new ErrorHandler("Internal server error", 500);
  }

  // parse environment variable to environment value
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

  // options for cookies
  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // refresh token options
  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // only set secure true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
