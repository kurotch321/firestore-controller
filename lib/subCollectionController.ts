import cloudFirestore from "./firestoreController";

async function writeSubDoc(
    collection: string,
    docId: string,
    subCollection: string,
    subDocId: string,
    data: object
): Promise<FirebaseFirestore.WriteResult> {
    return await cloudFirestore
        .collection(collection)
        .doc(docId)
        .collection(subCollection)
        .doc(subDocId)
        .set(data);
}

async function readSubDoc(
    collection: string,
    docId: string,
    subCollection: string,
    subDocId: string
): Promise<FirebaseFirestore.DocumentData | undefined> {
    return (
        await cloudFirestore
            .collection(collection)
            .doc(docId)
            .collection(subCollection)
            .doc(subDocId)
            .get()
    ).data();
}

async function updateSubDoc(
    collection: string,
    docId: string,
    subCollection: string,
    subDocId: string,
    data: object
): Promise<FirebaseFirestore.WriteResult> {
    return await cloudFirestore
        .collection(collection)
        .doc(docId)
        .collection(subCollection)
        .doc(subDocId)
        .update(data);
}

async function deleteSubDoc(
    collection: string,
    docId: string,
    subCollection: string,
    subDocId: string
): Promise<FirebaseFirestore.WriteResult> {
    return await cloudFirestore
        .collection(collection)
        .doc(docId)
        .collection(subCollection)
        .doc(subDocId)
        .delete();
}

async function deleteSubDocField(
    collection: string,
    docId: string,
    subCollection: string,
    subDocId: string,
    field: string
): Promise<FirebaseFirestore.WriteResult> {
    return await cloudFirestore
        .collection(collection)
        .doc(docId)
        .collection(subCollection)
        .doc(subDocId)
        .update({
            [field]: FirebaseFirestore.FieldValue.delete(),
        });
}

async function getAllSubDocs(
    collection: string,
    docId: string,
    subCollection: string
): Promise<string[]> {
    const snapshot = await cloudFirestore
        .collection(collection)
        .doc(docId)
        .collection(subCollection)
        .listDocuments();
    return snapshot.map((doc) => doc.id);
}

async function readAllSubDocs(
    collection: string,
    docId: string,
    subCollection: string
): Promise<{ [key: string]: FirebaseFirestore.DocumentData | undefined }> {
    const targetDocs = await getAllSubDocs(collection, docId, subCollection);
    const dataArray: {
        [key: string]: FirebaseFirestore.DocumentData | undefined;
    } = {};
    for (const doc of targetDocs) {
        dataArray[doc] = await readSubDoc(collection, docId, subCollection, doc);
    }
    return dataArray;
}

export {
    writeSubDoc,
    readSubDoc,
    updateSubDoc,
    deleteSubDoc,
    deleteSubDocField,
    getAllSubDocs,
    readAllSubDocs,
};
