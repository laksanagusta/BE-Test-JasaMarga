import Joi from "joi";

const createRuasValidation = Joi.object({
  ruas: Joi.string().max(255).required(),
  km_awal: Joi.string().max(255).required(),
  km_akhir: Joi.string().max(255).required(),
  status: Joi.boolean().required(),
  ruasCoordinates: Joi.array()
    .items(
      Joi.string()
        .max(255)
        .regex(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/i)
        .required()
    )
    .required(),
});

const updateRuasValidation = Joi.object({
  ruas: Joi.string().max(255).required(),
  km_awal: Joi.string().max(255).optional(),
  km_akhir: Joi.string().max(255).optional(),
  status: Joi.boolean().optional(),
});

const getRuasValidation = Joi.number().positive().required();

export { createRuasValidation, getRuasValidation, updateRuasValidation };
