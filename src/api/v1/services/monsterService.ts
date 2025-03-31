import { Monster } from "../models/monsterModel"
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepository"

const COLLECTION = "Monsters";

export const getAllMonsters = async(): Promise<Monster[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data} as Monster;
    });
};

export const getMonsterById = async (id: string): Promise<Monster | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Monster;
};

export const createmonster = async(monster: Partial<Monster>) : Promise<monster> => {
    const id = await createDocument(COLLECTION, monster);
    return { id, ...monster} as Monster;
};

export const updatemonster = async (
    id: string,
    updatedData: Partial<Monster>
): Promise<Monster> => {
    await updateDocument(COLLECTION, id, updatedData);
    return { id, ...updatedData} as Monster;
};

export const deletemonster = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
}