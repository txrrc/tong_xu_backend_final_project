import { Request, Response, NextFunction } from "express";
import * as monsterService from "../services/monsterService";
import type { Monster } from "../models/monsterModel";

interface ExtendedError extends Error {
    code?: string;
    statusCode?: number;
}

export const getAllMonsters = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const monsters: Monster[] = await monsterService.getAllMonsters();
        res.status(200).json({ message: "Monsters retrieved", data: monsters});
    } catch(error) {
        const err: ExtendedError = new Error("Failed to retrieve heroes");
        err.statusCode = 500;
        next(err);
    }
};

export const getMonsterById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.id) {
            const err: ExtendedError = new Error("Monster id is required.")
            err.statusCode = 400;
            err.code = "Missing Monster id";
            return next(err);
        }
        const monster: Monster | null = await monsterService.getMonsterById(req.params.id);
        if (!monster) {
            const err: ExtendedError = new Error(`Monster with id ${req.params.id} not found.`);
            err.statusCode = 404;
            err.code = "Monster not found";
            return next(err);
        }
        res.status(200).json({ message: "Monster by id retrieved", data: monster})
    } catch(error) {
        const err: ExtendedError = new Error("Error retrieving monsters");
        err.statusCode = 500;
        err.code = "Database error";
        next(err);
    }
};

export const createMonster = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newMonster: Monster = await monsterService.createMonster(req.body);
        res.status(201).json({ message: "New monster created", data: newMonster});
    } catch(error) {
        const err: ExtendedError = new Error("Failed to create monster.");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const updateMonster = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.id) {
            const err: ExtendedError = new Error("Monster id is required.");
            err.statusCode = 400;
            err.code = "Missing monster id";
            return next(err);
        }
        const updatedMonster: Monster | null = await monsterService.updateMonster(
            req.params.id,
            req.body
        );

        if (!updateMonster) {
            const err: ExtendedError = new Error(`Monster with id ${req.params.id} not found.`);
            err.statusCode = 404,
            err.code = "Monster not found";
            return next(err);
        }
        res.status(200).json({
            message: "Monster updated",
            data: updatedMonster
        })
    } catch(error) {
        console.error("error happens in updateMonster", error);
        const err: ExtendedError = new Error("Failed to update monster");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const deleteMonster = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await monsterService.deleteMonster(req.params.id);
        res.status(200).json({ message: "Monster deleted."});
    } catch(error) {
        next(error);
    }
};