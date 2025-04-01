import Joi, { ObjectSchema } from "joi";

export const affiliationSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Affiliation name is required.",
        "string.empty": "affiliation id cannot be empty.",
    }),
    name: Joi.string().optional().messages({
        "string.empty": "Affiliation name cannot be empty.",
    }),
    background: Joi.string().messages({
        "string.empty": "Affiliation background cannot be empty."
    }),
});