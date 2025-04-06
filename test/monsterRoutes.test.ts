import request from "supertest";
import { app } from "../src/app";
import * as monsterController from "../src/api/v1/controllers/monsterController";
import { createMonster, deleteMonster, getAllMonsters, getMonsterById, updateMonster } from "src/api/v1/services/monsterService";
import { mock } from "node:test";

jest.mock("../src/api/v1/controllers/monsterController", () => ({
    getAllMonsters: jest.fn((req, res) => res.status(200).send()),
    getMonsterById: jest.fn((req,res) => res.status(200).send()),
    createMonster: jest.fn((req, res) => res.status(201).send()),
    deleteMonster: jest.fn((req, res) => res.status(200).send()),
    updateMonster: jest.fn((req, res) => res.status(200).send()),
}));

describe("Monster Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Get api/v1/monsteres", () => {
        it ("should call getAllMonsteres controller", async () => {
            await request(app).get("/api/v1/monsters");
            expect(monsterController.getAllMonsters).toHaveBeenCalled();
        });
    });

    describe("Get api/v1/monsteres/:id", () => {
        it ("should call getMonsterById controller", async () => {
            await request(app).get("/api/v1/monsters/:id");
            expect(monsterController.getMonsterById).toHaveBeenCalled();
        });
    });

    describe("Post api/v1/monsteres", () => {
        it ("should call createMonster controller", async () => {
            const mockMonster = {
                id: "20",
                name: "King of the sea",
                rank: "Ghost",
                ability: "Acid",
            };
            await request(app).post("/api/v1/monsters").send(mockMonster);
            expect(monsterController.createMonster).toHaveBeenCalled();
        });
    });

    describe("Put api/v1/monsteres/:id", () => {
        it ("should call updateMonster controller", async () => {
            const mockMonster = {
                id: "20",
                name: "King of the sea",
                rank: "Ghost",
                ability: "Acid",
            };
            await request(app).put("/api/v1/monsters/9").send(mockMonster);
            expect(monsterController.updateMonster).toHaveBeenCalled();
        });
    });

    describe("Delete /api/v1/monsteres:/id", () => {
        it ("should call deleteMonster controller", async () => {
            await request(app).delete("/api/v1/monsters/20").send();
            expect(monsterController.deleteMonster).toHaveBeenCalled();
        });
    });
});