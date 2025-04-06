import request from "supertest";
import { app } from "../src/app";
import * as affiliationController from "../src/api/v1/controllers/affiliationController";
import { createAffiliation, deleteAffiliation, getAllAffiliations, getAffiliationById, updateAffiliation } from "src/api/v1/services/affiliationService";

jest.mock("../src/api/v1/controllers/affiliationController", () => ({
    getAllAffiliations: jest.fn((req, res) => res.status(200).send()),
    getAffiliationById: jest.fn((req,res) => res.status(200).send()),
    createAffiliation: jest.fn((req, res) => res.status(201).send()),
    deleteAffiliation: jest.fn((req, res) => res.status(200).send()),
    updateAffiliation: jest.fn((req, res) => res.status(200).send()),
}));

describe("Affiliation Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Get api/v1/affiliations", () => {
        it ("should call getAllAffiliations controller", async () => {
            await request(app).get("/api/v1/affiliations");
            expect(affiliationController.getAllAffiliations).toHaveBeenCalled();
        });
    });

    describe("Get api/v1/affiliations/:id", () => {
        it ("should call getAffiliationById controller", async () => {
            await request(app).get("/api/v1/affiliations/:id");
            expect(affiliationController.getAffiliationById).toHaveBeenCalled();
        });
    });

    describe("Post api/v1/affiliations", () => {
        it ("should call createAffiliation controller", async () => {
            const mockAffiliation = {
                id: "3",
                name: "Family of monster",
                background: "An association locates under City Z"
            };
            await request(app).post("/api/v1/affiliations").send(mockAffiliation);
            expect(affiliationController.createAffiliation).toHaveBeenCalled();
        });
    });

    describe("Put api/v1/affiliations/:id", () => {
        it ("should call updateAffiliation controller", async () => {
            const mockAffiliation = {
                id: "3",
                name: "Family of monster",
                background: "An association locates under City Z"
            };
            await request(app).put("/api/v1/affiliations/9").send(mockAffiliation);
            expect(affiliationController.updateAffiliation).toHaveBeenCalled();
        });
    });

    describe("Delete /api/v1/affiliations:/id", () => {
        it ("should call deleteAffiliation controller", async () => {
            await request(app).delete("/api/v1/affiliations/9").send();
            expect(affiliationController.deleteAffiliation).toHaveBeenCalled();
        });
    });
});