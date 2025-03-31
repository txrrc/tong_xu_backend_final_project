import { db } from "../../../../config/firebaseConfig";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { Hero } from "../models/heroModel";
import { Monster } from "../models/monsterModel"; 
import { Affiliation } from "../models/affiliationModel";

type FirestoreDataTypes =
	| string
	| number
	| boolean
	| null
	| Timestamp
	| FieldValue;

interface FieldValuePair {
	fieldName: string;
	fieldValue: FirestoreDataTypes;
}

/**
 * Executes a series of operations within a Firestore transaction.
 * @param {(transaction: FirebaseFirestore.Transaction) => Promise<T>} operations - Function containing the operations to perform within the transaction.
 * @returns {Promise<T>} - The result of the transaction.
 */
export const runTransaction = async <T>(
	operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
	try {
		return await db.runTransaction(operations);
	} catch (error) {
		console.error("Transaction failed:", error);
		throw error;
	}
};

/**
 * Creates a new document in a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {Partial<T>} data - The data for the new document.
 * @returns {Promise<string>} - The ID of the newly created document.
 */
export const createDocument = async <T>(
	collectionName: string,
	data: Partial<T>,
	id?: string
): Promise<string> => {
	try {
		let docRef: FirebaseFirestore.DocumentReference;

		if (id) {
			docRef = db.collection(collectionName).doc(id);
			await docRef.set(data);
		} else {
			docRef = await db.collection(collectionName).add(data);
		}

		return docRef.id;
	} catch (error) {
		console.error(`Failed to create document in ${collectionName}:`, error);
		throw error;
	}
};

/**
 * Retrieves all documents from a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<FirebaseFirestore.QuerySnapshot>} - A QuerySnapshot containing all documents.
 */
export const getDocuments = async (
	collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
	try {
		return await db.collection(collectionName).get();
	} catch (error) {
		console.error(
			`Failed to fetch documents from ${collectionName}:`,
			error
		);
		throw error;
	}
};

/**
 * Retrieves a document by its ID from a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to retrieve.
 * @returns {Promise<FirebaseFirestore.DocumentSnapshot | null>} - The document or null if it doesn't exist.
 */
export const getDocumentById = async (
	collectionName: string,
	id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
	try {
		const doc: FirebaseFirestore.DocumentSnapshot = await db
			.collection(collectionName)
			.doc(id)
			.get();
		return doc?.exists ? doc : null;
	} catch (error) {
		console.error(
			`Failed to fetch document ${id} from ${collectionName}:`,
			error
		);
		throw error;
	}
};

/**
 * Updates an existing document in a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to update.
 * @param {Partial<T>} data - The updated document data.
 * @returns {Promise<void>}
 */
export const updateDocument = async <T>(
	collectionName: string,
	id: string,
	data: Partial<T>
): Promise<void> => {
	try {
		await db.collection(collectionName).doc(id).update(data);
	} catch (error) {
		console.error(
			`Failed to update document ${id} in ${collectionName}:`,
			error
		);
		throw error;
	}
};

/**
 * Deletes a document from a specified Firestore collection.
 * Can operate within a transaction if provided, otherwise performs a direct delete.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to delete.
 * @param {FirebaseFirestore.Transaction} [transaction] - Optional Firestore transaction.
 * @returns {Promise<void>}
 */
export const deleteDocument = async (
	collectionName: string,
	id: string,
	transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
	try {
		const docRef: FirebaseFirestore.DocumentReference = db
			.collection(collectionName)
			.doc(id);
		if (transaction) {
			transaction.delete(docRef);
		} else {
			await docRef.delete();
		}
	} catch (error) {
		console.error(
			`Failed to delete document ${id} from ${collectionName}:`,
			error
		);
		throw error;
	}
};

/**
 * Deletes documents from a specified collection based on multiple field values.
 * Can operate within a transaction if provided, otherwise performs a batch delete.
 * @param {string} collectionName - The name of the collection to delete from.
 * @param {FieldValuePair[]} fieldValuePairs - An array of field-value pairs to filter on.
 * @param {FirebaseFirestore.Transaction} [transaction] - Optional Firestore transaction object.
 * @returns {Promise<void>}
 */
export const deleteDocumentsByFieldValues = async (
	collectionName: string,
	fieldValuePairs: FieldValuePair[],
	transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
	try {
		let query: FirebaseFirestore.Query = db.collection(collectionName);

		// Apply all field-value filters
		fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
			query = query.where(fieldName, "==", fieldValue);
		});

		let snapshot: FirebaseFirestore.QuerySnapshot;

		if (transaction) {
			snapshot = await transaction.get(query);
			snapshot.docs.forEach((doc) => {
				transaction.delete(doc.ref);
			});
		} else {
			snapshot = await query.get();
			const batch: FirebaseFirestore.WriteBatch = db.batch();
			snapshot.docs.forEach((doc) => {
				batch.delete(doc.ref);
			});
			await batch.commit();
		}
	} catch (error) {
		const fieldValueString: string = fieldValuePairs
			.map(({ fieldName, fieldValue }) => `${fieldName} == ${fieldValue}`)
			.join(" AND ");
		console.error(
			`Failed to delete documents from ${collectionName} where ${fieldValueString}:`,
			error
		);
		throw error;
	}
};