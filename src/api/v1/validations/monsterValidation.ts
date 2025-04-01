import Joi, { ObjectSchema } from "joi";

export const monsterSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Monster id is required.",
        "string.empty": "Monster id cannot be empty.",
    }),
    name: Joi.string().optional().messages({
        "string.empty": "Monster name cannot be empty",
    }),
    rank: Joi.string().optional().messages({
        "string.empty": "Monster rank cannot be empty",
    }),
    ability: Joi.string().optional().messages({
        "string.empty": "Monster ability cannot be empty.",
    }),
});