import firebase_app from "config/firebase_config";
import { getFirestore, query, getDocs, collection, where, limit } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocument(id) {
    console.log(id)

    let result = null;
    let error = null;
    let docId = null;

    try {
        const q = query(collection(db, "users"), where("uid", "==", id), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            result = querySnapshot.docs[0].data();
            docId = querySnapshot.docs[0].id;
        } else {
            error = "User doesn't exist";
        }
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }




    return { result, error, docId };
}
