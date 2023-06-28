import firebase_app from "config/firebase_config";
import { getFirestore, collection, getDocs, query, where, or } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function findschool(school) {
    let schoolRef = collection(db, "school");
    const q = query(schoolRef, where("name", "==", school.name));

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
