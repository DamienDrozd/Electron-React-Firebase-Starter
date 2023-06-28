import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Create a root reference
const storage = getStorage();
export default async function addImage(file, path) {
    // Create a reference to 'mountains.jpg'
    const fileRef = ref(storage, path);

    let snapshot = await uploadBytes(fileRef, file)
    const url = getDownloadURL(snapshot.ref)

    let result = null;
    let error = null;

    try {
        result = await url
        console.log("result : ", result)
    } catch (e) {
        error = e;
        console.log("error : ", error)
    }

    return {result, error};
}