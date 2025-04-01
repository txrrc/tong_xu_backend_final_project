import Joi, { ObjectSchema } from "joi";

export const heroSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Hero id is required.",
        "string.empty": "Hero id cannot be empty.",
    }),
    name: Joi.string().optional().messages({
        "string.empty": "Hero name cannot be empty",
    }),
    rank: Joi.string().optional().messages({
        "string.empty": "Hero rank cannot be empty",
    }),
    ability: Joi.string().optional().messages({
        "string.empty": "Hero ability cannot be empty.",
    }),
});