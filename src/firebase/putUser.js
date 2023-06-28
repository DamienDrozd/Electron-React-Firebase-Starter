import firebase_app from "config/firebase_config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import getUser from "./getUser";

const db = getFirestore(firebase_app)
export default async function putData(uid, data) {
    let result = null;
    let error = null;

    try {
        const user = await getUser(uid);
        let docId = user.docId;
        result = await updateDoc(doc(db, "users", docId), data);
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }
    return { result, error };
}