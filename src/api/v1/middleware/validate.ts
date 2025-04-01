// External library imports
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

// Internal module imports
import { MiddlewareFunction, RequestData } from "../types/express";

interface ExtendedError extends Error {
    code?: string;
    statusCode?: number;
}

export const validateRequest = (schema: ObjectSchema): MiddlewareFunction => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const data: RequestData = {
				...req.body,
				...req.params,
				...req.query,
			};
			validate(schema, req.body);
			next();
		} catch (error) {
			const err: ExtendedError = new Error((error as Error).message);
			err.statusCode = 400;
			err.code = "VALIDATION_ERROR";
			next(err);
		}
	};
};

export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) {
		throw new Error(
			`Validation error: ${error.details
				.map((x) => x.message)
				.join(", ")}`
		);
	}
};