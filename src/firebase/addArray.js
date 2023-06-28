import firebase_app from "config/firebase_config";
import { getFirestore, arrayUnion, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addArray(colllection, document, array, data) {
    let result = null;
    let error = null;

    let docRef = doc(db, colllection, document);

    try {
        result = await updateDoc(docRef, {
            [array]: arrayUnion(data)
        });
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }

    return { result, error };
}