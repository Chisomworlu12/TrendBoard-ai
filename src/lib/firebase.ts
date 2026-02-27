import { initializeApp } from "firebase/app";
import { getFirestore, terminate, clearIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function resetFirestore() {
  await terminate(db);
  await clearIndexedDbPersistence(db);
  window.location.reload();
}