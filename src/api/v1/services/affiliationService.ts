import { Affiliation } from "../models/affiliationModel"
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepository"

const COLLECTION = "Affiliations";

export const getAllAffiliations = async(): Promise<Affiliation[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data} as Affiliation;
    });
};

export const getAffiliationById = async (id: string): Promise<Affiliation | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Affiliation;
};

export const createAffiliation = async(Affiliation: Partial<Affiliation>) : Promise<Affiliation> => {
    const id = await createDocument(COLLECTION, Affiliation);
    return { id, ...Affiliation} as Affiliation;
}; 

export const updateAffiliation = async (
    id: string,
    updatedData: Partial<Affiliation>
): Promise<Affiliation> => {
    await updateDocument(COLLECTION, id, updatedData);
    return { id, ...updatedData} as Affiliation;
};

export const deleteAffiliation = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
}