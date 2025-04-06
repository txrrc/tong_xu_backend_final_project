import { Request, Response, NextFunction } from "express";
import * as monsterController from "../src/api/v1/controllers/monsterController";
import * as monsterService from "../src/api/v1/services/monsterService";

jest.mock("../src/api/v1/services/monsterService", () => ({
    getAllMonsters: jest.fn(),
    getMonsterById: jest.fn(),
    createMonster: jest.fn(),
    updateMonster: jest.fn(),
    deleteMonster: jest.fn(),
}));

describe("Monster Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllMonsters", () => {
        it ("should retrieve all monsters", async () => {
            const mockedmonster = {
                id: "20",
                name: "King of the sea",
                rank: "Ghost",
                ability: "Acid",
            };
            (monsterService.getAllMonsters as jest.Mock).mockResolvedValue(mockedmonster);
            await monsterController.getAllMonsters(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Monsters retrieved",
                data: mockedmonster,
            });
        });
    });

    describe("getMonsterByID", () => {
            it ("should get monster by ID", async () => {
                const mockedmonster = 
                    {
                        id: "20",
                        name: "King of the sea",
                        rank: "Ghost",
                        ability: "Acid",
                    };
                
                (monsterService.getMonsterById as jest.Mock).mockResolvedValue(mockedmonster);
                mockReq.params = { id: "9" };
                await monsterController.getMonsterById(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Monster by id retrieved",
                    data: mockedmonster,
                });
            });
        });

    describe("createMonster", () => {
        it ("should handle succesfully monster creation", async () => {
            const mocknewMonster = {
                id: "20",
                name: "King of the sea",
                rank: "Ghost",
                ability: "Acid",
            };
            (monsterService.createMonster as jest.Mock).mockResolvedValue(mocknewMonster);
            mockReq.body = mocknewMonster;
            await monsterController.createMonster(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "New monster created",
                data:mocknewMonster,
            });
        });
    });

    describe("updateMonster", () => {
        it ("should handle successfully monster update", async () => {
            const updatedMonster = {
                ID: "2",
                Name: "Winnipeg Branch",
                Address: "7250 82 Ave NW, Edmonton, MB, R3B 0G4",
                Phone: "780-468-6800"
            };
            (monsterService.updateMonster as jest.Mock).mockResolvedValue(updatedMonster);
            mockReq.params = { id: "2"};
            mockReq.body = updatedMonster;
            await monsterController.updateMonster(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Monster updated",
                data: updatedMonster
            });
        });
    });

    describe("deleteMonster", () => {
            it ("should handle successfully delete monster", async () => {
                (monsterService.deleteMonster as jest.Mock).mockResolvedValue(true);
    
                mockReq.params = { id: "2"};
                await monsterController.deleteMonster(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
                expect (mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Monster deleted.",
                });
            });
        });
});