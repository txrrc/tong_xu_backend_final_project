import { Request, Response, NextFunction } from "express";
import * as HeroService from "../services/heroService";
import type { Hero } from "../models/heroModel";

interface ExtendedError extends Error {
    code?: string; // Optional custom error code
    statusCode?: number; // HTTP status code for the error
}

export const getAllHeroes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const heroes: Hero[] = await HeroService.getAllHeroes();
        res.status(200).json({ message: "Heroes retrieved", data: heroes});
    } catch(error) {
        const err: ExtendedError = new Error("Failed to retrieve all heroes");
        err.statusCode = 500;
        next(err);
    }
};