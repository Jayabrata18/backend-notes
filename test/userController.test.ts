import { Request, Response } from "express";
import {
  registrationUser,
  loginUser,
  logoutUser,
  updateAccessToken,
} from "../controllers/userController";
import userModel from "../models/userModel";
import { mocked } from "jest-mock";
import { IUser } from "../models/userModel";
import { mockClear } from "jest-mock-extended";
// import { mockedObjectId } from "./noteController.test";
import mongoose from "mongoose";
jest.mock("../models/userModel");

const mockedUserModel = mocked(userModel, { shallow: true });
const mockedUser = mocked<IUser>({} as IUser, { shallow: true });
const mockedRequest = mocked<Request>({} as Request, { shallow: true });
const mockedResponse = mocked<Response>({} as Response, { shallow: true });
const mockedNextFunction = jest.fn();
const mockedObjectId = new mongoose.Types.ObjectId();
const mockedUserId = mockedObjectId.toHexString();
const mockedUserEmail = "test@test.com";

const mockedUserRequest = {
  body: {
    email: mockedUserEmail,
  },
  user: mockedUser,
};
const mockedUserResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockedUserNextFunction = jest.fn();
const mockedUserErrorStatus = 400;
const mockedUserErrorMessage = "mocked user error message";
const mockedUserErrorHandler = {
  message: mockedUserErrorMessage,
  statusCode: mockedUserErrorStatus,
};
const mockedUserRegistrationUser = jest.fn();
const mockedUserLoginUser = jest.fn();
const mockedUserLogoutUser = jest.fn();

const mockedUserUpdateAccessToken = jest.fn();
const mockedUserUpdateRefreshToken = jest.fn();
const mockedUserGenerateAccessToken = jest.fn();
const mockedUserGenerateRefreshToken = jest.fn();
const mockedUserSendToken = jest.fn();
const mockedUserRedisSet = jest.fn();
const mockedUserRedisGet = jest.fn();
const mockedUserRedisDel = jest.fn();
const mockedUserRedisExpire = jest.fn();
const mockedUserJwtSign = jest.fn();
const mockedUserJwtVerify = jest.fn();
const mockedUserJwtDecode = jest.fn();
const mockedUserJwtPayload = {
  userId: mockedUserId,
  email: mockedUserEmail,
};
const mockedUserJwtOptions = {
  expiresIn: "1d",
};

describe("userController", () => {
  beforeEach(() => {
  });

  describe("registrationUser", () => {
    it("should register a new user", async () => {
    mockedUserRegistrationUser.mockResolvedValueOnce(mockedUser);
    mockedUserSendToken.mockResolvedValueOnce(mockedUser);
    mockedUserRedisSet.mockResolvedValueOnce(mockedUser);
    mockedUserRedisExpire.mockResolvedValueOnce(mockedUser);
    mockedUserJwtSign.mockResolvedValueOnce(mockedUser);
    mockedUserJwtVerify.mockResolvedValueOnce(mockedUser);
    mockedUserJwtDecode.mockResolvedValueOnce(mockedUserJwtPayload);

    await registrationUser(
        mockedRequest,
        mockedResponse,
        mockedNextFunction
    );

    }
    )})
    
    describe("loginUser", () => {
        it("should login a user", async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(mockedUser);
            mockedUserLoginUser.mockResolvedValueOnce(mockedUser);
            mockedUserSendToken.mockResolvedValueOnce(mockedUser);
            mockedUserRedisSet.mockResolvedValueOnce(mockedUser);
            mockedUserRedisExpire.mockResolvedValueOnce(mockedUser);
            mockedUserJwtSign.mockResolvedValueOnce(mockedUser);
            mockedUserJwtVerify.mockResolvedValueOnce(mockedUser);
            mockedUserJwtDecode.mockResolvedValueOnce(mockedUserJwtPayload);
    
            await loginUser(mockedRequest, mockedResponse, mockedNextFunction);
    
        });
        });
        describe("logoutUser", () => {
            it("should logout a user", async () => {
                mockedUserLogoutUser.mockResolvedValueOnce(mockedUser);
                mockedUserRedisDel.mockResolvedValueOnce(mockedUser);
                await logoutUser(mockedRequest, mockedResponse, mockedNextFunction);
            });
        });
        describe("updateAccessToken", () => {
            it("should update access token", async () => {
                mockedUserUpdateAccessToken.mockResolvedValueOnce(mockedUser);
                mockedUserRedisGet.mockResolvedValueOnce(mockedUser);
                mockedUserRedisDel.mockResolvedValueOnce(mockedUser);
                mockedUserJwtVerify.mockResolvedValueOnce(mockedUser);
                mockedUserJwtDecode.mockResolvedValueOnce(mockedUserJwtPayload);
                mockedUserJwtSign.mockResolvedValueOnce(mockedUser);
                mockedUserRedisSet.mockResolvedValueOnce(mockedUser);
                mockedUserRedisExpire.mockResolvedValueOnce(mockedUser);
                await updateAccessToken(mockedRequest, mockedResponse, mockedNextFunction);
            });
        });
    }
    );


