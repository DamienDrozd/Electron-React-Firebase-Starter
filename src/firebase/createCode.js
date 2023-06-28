import firebase_app from "config/firebase_config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import getUser from "./getUser";
import getDocument from "./getDocument";
import { getDocs, query, where, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function createCode(collection_name, id) {
    let result = null;
    let error = null;

    try {
        const res1 = await getDocument(collection_name, id);
        let data = res1.result.data();
        let error = res1.error;
        if (error) {
            return { res1, error };
        }

        data.code = getrandom();
        let schoolRef = collection(db, collection_name);
        const q = query(schoolRef, where("code", "==", data.code));
        let res2 = await getDocs(q);
        if (res2.docs.length > 0) {
            return await createCode(collection_name, id);
        } else {
            console.log("data : ", data)
            result = await updateDoc(doc(db, collection_name, id), data);
        }
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }
    return { result, error };
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}