import firebase_app from "config/firebase_config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const storage = getStorage();
export default async function getImage(path) {
    const url = getDownloadURL(ref(storage, path))
    let result = null;
    let error = null;



    try {
        result = await url
        console.log("result : ", result)
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }

    return result, error;
}
