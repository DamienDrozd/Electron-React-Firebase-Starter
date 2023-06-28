import firebase_app from "config/firebase_config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
const addData = async (colllection, data) => {
    let result = null;
    let error = null;

    try {
        result = await addDoc(collection(db, colllection), data);
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }

    return { result, error };
}

export default addData;