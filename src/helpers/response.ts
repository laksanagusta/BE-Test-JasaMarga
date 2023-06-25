import { Response } from "express";

const SUCCESS_MESSAGE = "Yay, success load data.";
const ERROR_MESSAGE = "Oops, failed load data.";
const VALIDATION_MESSAGE = "Oops, validation error.";

const successResponse = (res: any, data: any, message = SUCCESS_MESSAGE) => {
  return res.status(200).json({
    status: true,
    message: message,
    data: data,
  });
};

const errorResponse = (res: Response, message = ERROR_MESSAGE) => {
  return res.status(500).json({
    status: false,
    message: message,
    data: null,
  });
};

const validationResponse = (
  res: any,
  data: any,
  message = VALIDATION_MESSAGE
) => {
  return res.status(400).json({
    status: false,
    message: message,
    data: data,
  });
};

const notFoundResponse = (
  res: Response,
  message: string = "Not found entity"
) => {
  return res.status(404).json({
    status: false,
    message: message,
  });
};

const unauthorizedResponse = (
  res: Response,
  message: string = "Unauthorized."
) => {
  return res.status(401).json({
    status: false,
    message: message,
  });
};

export default {
  unauthorizedResponse,
  notFoundResponse,
  validationResponse,
  errorResponse,
  successResponse,
};
