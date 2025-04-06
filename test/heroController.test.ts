import { Request, Response, NextFunction } from "express";
import * as heroController from "../src/api/v1/controllers/heroController";
import * as heroService from "../src/api/v1/services/heroService";

jest.mock("../src/api/v1/services/heroService", () => ({
    getAllHeroes: jest.fn(),
    getHeroById: jest.fn(),
    createHero: jest.fn(),
    updateHero: jest.fn(),
    deleteHero: jest.fn(),
}));

describe("Hero Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllHeroes", () => {
        it ("should retrieve all heroes", async () => {
            const mockedhero = {
                id: "9",
                name: "Tanktop Vegeterian",
                rank: "A",
                ability: "Tanktop smash",
            };
            (heroService.getAllHeroes as jest.Mock).mockResolvedValue(mockedhero);
            await heroController.getAllHeroes(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Heroes retrieved",
                data: mockedhero,
            });
        });
    });

    describe("getHeroByID", () => {
            it ("should get hero by ID", async () => {
                const mockedhero = 
                    {
                        id: "9",
                        name: "Tanktop Vegeterian",
                        rank: "A",
                        ability: "Tanktop smash",
                    };
                
                (heroService.getHeroById as jest.Mock).mockResolvedValue(mockedhero);
                mockReq.params = { id: "9" };
                await heroController.getHeroById(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Hero by id retrieved",
                    data: mockedhero,
                });
            });
        });

    describe("createHero", () => {
        it ("should handle succesfully hero creation", async () => {
            const mocknewHero = {
                id: "9",
                name: "Tanktop Vegeterian",
                rank: "A",
                ability: "Tanktop smash",
            };
            (heroService.createHero as jest.Mock).mockResolvedValue(mocknewHero);
            mockReq.body = mocknewHero;
            await heroController.createHero(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Hero created",
                data:mocknewHero,
            });
        });
    });

    describe("updateHero", () => {
        it ("should handle successfully hero update", async () => {
            const updatedHero = {
                ID: "2",
                Name: "Winnipeg Branch",
                Address: "7250 82 Ave NW, Edmonton, MB, R3B 0G4",
                Phone: "780-468-6800"
            };
            (heroService.updateHero as jest.Mock).mockResolvedValue(updatedHero);
            mockReq.params = { id: "2"};
            mockReq.body = updatedHero;
            await heroController.updateHero(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Hero updated",
                data: updatedHero
            });
        });
    });

    describe("deleteHero", () => {
            it ("should handle successfully delete hero", async () => {
                (heroService.deleteHero as jest.Mock).mockResolvedValue(true);
    
                mockReq.params = { id: "2"};
                await heroController.deleteHero(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
                expect (mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Hero deleted",
                });
            });
        });
});