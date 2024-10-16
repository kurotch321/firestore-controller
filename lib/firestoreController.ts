import { Firestore } from "@google-cloud/firestore";
import { decodeSAJson } from "./decodeServiceAccount";

if (!process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT) {
  throw new Error(
    "Cannot find GOOGLE_CLOUD_SERVICE_ACCOUNT in environment variables"
  );
}

const serviceAccount = decodeSAJson(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT);

const firestoreConfig: FirebaseFirestore.Settings = {
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  },
  ignoreUndefinedProperties: true,
};

const cloudFirestore = new Firestore(firestoreConfig);

export default cloudFirestore;
export * from "./mainController";
export * from "./subCollectionController";
