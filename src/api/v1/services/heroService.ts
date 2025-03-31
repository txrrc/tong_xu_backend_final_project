import { Hero } from "../models/heroModel"
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepository"

const COLLECTION = "Heroes";

export const getAllHeroes = async(): Promise<Hero[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data} as Hero;
    });
};

export const getHeroById = async (id: string): Promise<Hero | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Hero;
};

export const createHero = async(hero: Partial<Hero>) : Promise<Hero> => {
    const id = await createDocument(COLLECTION, hero);
    return { id, ...hero} as Hero;
};

export const updateHero = async (
    id: string,
    updatedData: Partial<Hero>
): Promise<Hero> => {
    await updateDocument(COLLECTION, id, updatedData);
    return { id, ...updatedData} as Hero;
};

export const deleteHero = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
}