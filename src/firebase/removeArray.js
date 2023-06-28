import firebase_app from "config/firebase_config";
import { getFirestore, arrayRemove, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function removeArray(colllection, document, array, data) {
    let result = null;
    let error = null;

    let docRef = doc(db, colllection, document);

    try {
        result = await updateDoc(docRef, {
            [array]: arrayRemove(data)
        });
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }

    return { result, error };
}