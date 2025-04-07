import request from "supertest";
import { app } from "../src/app";
import * as heroController from "../src/api/v1/controllers/heroController";
import { createHero, deleteHero, getAllHeroes, getHeroById, updateHero } from "src/api/v1/services/heroService";
import { mock } from "node:test";

jest.mock("../src/api/v1/controllers/heroController", () => ({
    getAllHeroes: jest.fn((req, res) => res.status(200).send()),
    getHeroById: jest.fn((req,res) => res.status(200).send()),
    createHero: jest.fn((req, res) => res.status(201).send()),
    deleteHero: jest.fn((req, res) => res.status(200).send()),
    updateHero: jest.fn((req, res) => res.status(200).send()),
}));

describe("Hero Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Get api/v1/heroes", () => {
        it ("should call getAllHeroes controller", async () => {
            await request(app).get("/api/v1/heroes");
            expect(heroController.getAllHeroes).toHaveBeenCalled();
        });
    });

    describe("Get api/v1/heroes/:id", () => {
        it ("should call getHeroById controller", async () => {
            await request(app).get("/api/v1/heroes/:id");
            expect(heroController.getHeroById).toHaveBeenCalled();
        });
    });

    describe("Post api/v1/heroes", () => {
        it ("should call createHero controller", async () => {
            const mockHero = {
                id: "9",
                name: "Tanktop Vegeterian",
                rank: "A",
                ability: "Tanktop smash",
            };
            await request(app).post("/api/v1/heroes").send(mockHero);
            expect(heroController.createHero).toHaveBeenCalled();
        });
    });

    describe("Put api/v1/heroes/:id", () => {
        it ("should call updateHero controller", async () => {
            const mockHero = {
                id: "9",
                name: "Tanktop Vegeterian",
                rank: "A",
                ability: "Tanktop smash",
            };
            await request(app).put("/api/v1/heroes/9").send(mockHero);
            expect(heroController.updateHero).toHaveBeenCalled();
        });
    });

    describe("Delete /api/v1/heroes:/id", () => {
        it ("should call deleteHero controller", async () => {
            await request(app).delete("/api/v1/heroes/9").send();
            expect(heroController.deleteHero).toHaveBeenCalled();
        });
    });
});