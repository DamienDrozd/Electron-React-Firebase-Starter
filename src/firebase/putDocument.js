import firebase_app from "config/firebase_config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function putData(colllection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await updateDoc(doc(db, colllection, id), data);
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }
    return { result, error };
}