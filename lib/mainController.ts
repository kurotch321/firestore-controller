import cloudFirestore, {
  deleteSubDoc,
  getAllSubDocs,
} from "./firestoreController";
import { FieldValue } from "@google-cloud/firestore";

async function writeDoc(
  collection: string,
  id: string,
  data: object
): Promise<FirebaseFirestore.WriteResult> {
  return await cloudFirestore.collection(collection).doc(id).set(data);
}

async function readDoc(
  collection: string,
  id: string
): Promise<FirebaseFirestore.DocumentData | null> {
  return (
    (await cloudFirestore.collection(collection).doc(id).get()).data() || null
  );
}

async function updateDoc(
  collection: string,
  id: string,
  data: object
): Promise<FirebaseFirestore.WriteResult> {
  return await cloudFirestore.collection(collection).doc(id).update(data);
}

async function deleteDoc(
  collection: string,
  id: string
): Promise<FirebaseFirestore.WriteResult> {
  const subCollections = await getAllSubCollections(collection, id);
  for (const subCollection of subCollections) {
    const subCollectionDocs = await getAllSubDocs(
      collection,
      id,
      subCollection
    );
    for (const doc of subCollectionDocs) {
      await deleteSubDoc(collection, id, subCollection, doc);
    }
  }
  return await cloudFirestore.collection(collection).doc(id).delete();
}

async function deleteField(
  collection: string,
  id: string,
  field: string
): Promise<FirebaseFirestore.WriteResult> {
  return await cloudFirestore
    .collection(collection)
    .doc(id)
    .update({
      [field]: FieldValue.delete(),
    });
}

async function getAllDocs(collection: string): Promise<string[]> {
  const snapshot = await cloudFirestore.collection(collection).listDocuments();
  return snapshot.map((doc) => doc.id);
}

async function readAllDocs(
  collection: string
): Promise<{ [key: string]: FirebaseFirestore.DocumentData | null }> {
  const targetDocs = await getAllDocs(collection);
  const dataArray: { [key: string]: FirebaseFirestore.DocumentData | null } =
    {};
  for (const doc of targetDocs) {
    dataArray[doc] = await readDoc(collection, doc);
  }
  return dataArray;
}

async function getAllSubCollections(
  collection: string,
  docId: string
): Promise<string[]> {
  const snapshot = await cloudFirestore
    .collection(collection)
    .doc(docId)
    .listCollections();
  return snapshot.map((col) => col.id);
}

export {
  writeDoc,
  readDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  getAllDocs,
  readAllDocs,
  getAllSubCollections,
};
