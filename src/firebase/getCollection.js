import firebase_app from "config/firebase_config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getCollection(collection_name) {
    const querySnapshot = await getDocs(collection(db, collection_name));
    let result = null;
    let error = null;



    try {
        result = querySnapshot
    } catch (e) {
        error = e;
    }

    return { result, error };
}
