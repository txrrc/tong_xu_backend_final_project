import { Request, Response, NextFunction } from "express";
import * as HeroService from "../services/heroService";
import type { Hero } from "../models/heroModel";
import { createDocument } from "../repositories/firestoreRepository";

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

export const getHeroById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.id) {
            const err: ExtendedError = new Error("Hero id is required")
            err.statusCode = 400;
            err.code = "Missing hero id";
            return next(err);
        }

        const hero: Hero | null = await HeroService.getHeroById(req.params.id);
        if (!hero) {
            const err: ExtendedError = new Error(`Hero with id ${req.params.id}`);
            err.statusCode = 404;
            err.code = "Hero not found";
            return next(err);
        }
        res.status(200).json({ message: "Hero by id retrieved", data: hero});
    } catch(error) {
        const err: ExtendedError = new Error("Error retrieving hero.");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const createHero = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newHero: Hero = await HeroService.createHero(req.body);
        res.status(201).json({ message: "Hero created", data: newHero});
    } catch(error) {
        const err: ExtendedError = new Error("Failed to create hero");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const updateHero = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.id) {
            const err: ExtendedError = new Error("Hero id is required");
            err.statusCode = 400;
            err.code = "Missing hero id";
            return next(err);
        }
        const updatedHero: Hero | null = await HeroService.updateHero(
            req.params.id,
            req.body
        );
        if (!updatedHero) {
            const err: ExtendedError = new Error(`Hero with id ${req.params.id} not found.`);
            err.statusCode = 404;
            err.code = "Hero not found";
            return next(err);
        }
        res.status(200).json({
            message: "Hero updated",
            data: updatedHero
        })
    } catch(error) {
        console.error("Error happens in updateHero", error);
        const err: ExtendedError = new Error("Failed to update hero");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const deleteHero = async (
    req: Request,
    res: Response,
    next: NextFunction
) :Promise<void> => {
    try {
        await HeroService.deleteHero(req.params.id);
        res.status(200).json({ message: "Hero deleted"});
    } catch(error) {
        next(error);
    }
};