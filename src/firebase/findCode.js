import firebase_app from "config/firebase_config";
import { getFirestore, collection, getDocs, query, where, or } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function findschool(collection_name, code) {
    let schoolRef = collection(db, collection_name);
    const q = query(schoolRef, where("code", "==", code));

    let result = null;
    let error = null;

    try {
        result = await getDocs(q);
    } catch (e) {
        error = e;
    }

    const results = result.docs

    return { results, error };
}
