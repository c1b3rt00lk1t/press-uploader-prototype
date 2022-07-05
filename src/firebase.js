// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as refDb, set } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlDzlrEY-VkPZdNkEZOTSbrLJcL2LoQTo",
  authDomain: "press-uploader.firebaseapp.com",
  projectId: "press-uploader",
  storageBucket: "press-uploader.appspot.com",
  messagingSenderId: "496555378224",
  databaseURL:
    "https://press-uploader-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:496555378224:web:323bd87185f34dfe5c8ff5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/** Cloud Storage */
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Real-time database
const database = getDatabase(app);


export const uploadFile = (file, path) => {
  const storageRef = refStorage(storage, path);

  return uploadBytes(storageRef, file);
};

export const getFileURL = async (path) => {
  const storageRef = refStorage(storage, path);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

/** Real time database */

// The update is restricted to a session in order to avoid bigger damages

export const writeDataSession = async (data) => {
  try {
    await set(refDb(database, "/sessions/" + data[0].session), data);
  } catch (error) {
    return false;
  }
  return true;
};
