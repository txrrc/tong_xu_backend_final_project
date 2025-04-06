import { Request, Response, NextFunction } from "express";
import * as affiliationController from "../src/api/v1/controllers/affiliationController";
import * as affiliationService from "../src/api/v1/services/affiliationService";

jest.mock("../src/api/v1/services/affiliationService", () => ({
    getAllAffiliations: jest.fn(),
    getAffiliationById: jest.fn(),
    createAffiliation: jest.fn(),
    updateAffiliation: jest.fn(),
    deleteAffiliation: jest.fn(),
}));

describe("Affiliation Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllAffiliations", () => {
        it ("should retrieve all affiliations", async () => {
            const mockedaffiliation = {
                id: "20",
                name: "King of the sea",
                rank: "Ghost",
                ability: "Acid",
            };
            (affiliationService.getAllAffiliations as jest.Mock).mockResolvedValue(mockedaffiliation);
            await affiliationController.getAllAffiliations(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Affiliations Retrieved",
                data: mockedaffiliation,
            });
        });
    });

    describe("getAffiliationByID", () => {
            it ("should get affiliation by ID", async () => {
                const mockedaffiliation = 
                    {
                        id: "20",
                        name: "King of the sea",
                        rank: "Ghost",
                        ability: "Acid",
                    };
                
                (affiliationService.getAffiliationById as jest.Mock).mockResolvedValue(mockedaffiliation);
                mockReq.params = { id: "9" };
                await affiliationController.getAffiliationById(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Affiliation by ID retrieved",
                    data: mockedaffiliation,
                });
            });
        });

    describe("createAffiliation", () => {
        it ("should handle succesfully affiliation creation", async () => {
            const mocknewAffiliation = {
                id: "20",
                name: "King of the sea",
                rank: "Ghost",
                ability: "Acid",
            };
            (affiliationService.createAffiliation as jest.Mock).mockResolvedValue(mocknewAffiliation);
            mockReq.body = mocknewAffiliation;
            await affiliationController.createAffiliation(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Affiliation created",
                data:mocknewAffiliation,
            });
        });
    });

    describe("updateAffiliation", () => {
        it ("should handle successfully affiliation update", async () => {
            const updatedAffiliation = {
                ID: "2",
                Name: "Winnipeg Branch",
                Address: "7250 82 Ave NW, Edmonton, MB, R3B 0G4",
                Phone: "780-468-6800"
            };
            (affiliationService.updateAffiliation as jest.Mock).mockResolvedValue(updatedAffiliation);
            mockReq.params = { id: "2"};
            mockReq.body = updatedAffiliation;
            await affiliationController.updateAffiliation(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Affiliation updated",
                data: updatedAffiliation
            });
        });
    });

    describe("deleteAffiliation", () => {
            it ("should handle successfully delete affiliation", async () => {
                (affiliationService.deleteAffiliation as jest.Mock).mockResolvedValue(true);
    
                mockReq.params = { id: "2"};
                await affiliationController.deleteAffiliation(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
                expect (mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Affiliation deleted",
                });
            });
        });
});