import { Request, Response, NextFunction } from "express";
import * as affiliationService from "../services/affiliationService";
import type { Affiliation } from "../models/affiliationModel";

interface ExtendedError extends Error {
	code?: string; // Optional custom error code
	statusCode?: number; // HTTP status code for the error
}

export const getAllAffiliations = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const Affiliationes: Affiliation[] = await affiliationService.getAllAffiliations();
        res.status(200).json({ message: "Affiliationes Retrieved", data: Affiliationes});
    } catch(error) {
        const err: ExtendedError = new Error("Failed to retrieve Affiliationes.");
        err.statusCode = 500;
        next(err);
    }
};

export const getAffiliationById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.id) {
            const err: ExtendedError = new Error("Affiliation id is required.");
            err.statusCode = 400;
            err.code = "Missing Affiliation id";
            return next(err);
        }
        
        const Affiliation: Affiliation | null = await affiliationService.getAffiliationById(req.params.id);
        if (!Affiliation) {
            const err: ExtendedError = new Error(`Affiliation with id ${req.params.id} not found.`);
            err.statusCode = 404;
            err.code = "Affiliation Not Found";
            return next(err);
        }
        res.status(200).json({ message: "Affiliation by ID retrieved", data: Affiliation})
    } catch(error) {
        const err: ExtendedError = new Error("Error retrieving Affiliation.");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const createAffiliation = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newAffiliation: Affiliation = await affiliationService.createAffiliation(req.body);
        res.status(201).json({ message: "Affiliation created", data: newAffiliation});
    } catch(error) {
        const err: ExtendedError = new Error("Failed to create Affiliation");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const updateAffiliation = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.id) {
            const err: ExtendedError = new Error("Affiliation id is required.");
            err.statusCode = 400;
            err.code = "Missing_Affiliation_id";
            return next(err);
        }

        const updatedAffiliation: Affiliation | null  = await affiliationService.updateAffiliation(
            req.params.id,
            req.body
        );

        if (!updatedAffiliation) {
            const err: ExtendedError = new Error(`Affiliation with ID ${req.params.id} not found.`);
            err.statusCode = 404;
            err.code = "Affiliation Not Found";
            return next(err);
        }
        res.status(200).json({
            message: "Affiliation updated",
            data: updatedAffiliation
        })
    } catch(error) {
        console.error("error happens in updateAffiliation", error);
        const err: ExtendedError = new Error("Failed to update Affiliation");
        err.statusCode = 500;
        err.code = "Database Error";
        next(err);
    }
};

export const deleteAffiliation = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await affiliationService.deleteAffiliation(req.params.id);
        res.status(200).json({ message: "Affiliation deleted"});
    } catch(error) {
        next(error);
    }
};