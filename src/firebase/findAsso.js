import firebase_app from "config/firebase_config";
import { getFirestore, collection, getDocs, query, where, or } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function findAsso(asso) {
    let assoRef = collection(db, "asso");
    const q = query(assoRef, or(where("name", "==", asso.name), where("siret", "==", asso.siret)));

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
