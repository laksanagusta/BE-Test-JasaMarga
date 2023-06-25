import { ResponseError } from "../error/response-error.js";

const validate = (schema: any, request: any) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.details[0].message);
  } else {
    return result.value;
  }
};

export { validate };
