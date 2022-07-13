/** 
 * LOGIC FOR THE BACKUP SERVER
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUy1hFE-VOkWqOS0FmeNakeqp531kVdx0",
  authDomain: "press-uploader-2.firebaseapp.com",
  projectId: "press-uploader-2",
  storageBucket: "press-uploader-2.appspot.com",
  messagingSenderId: "75363353539",
  appId: "1:75363353539:web:11077c15544e85eed47376"
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig, 'app2');

/** Cloud Storage */
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app2);

export const uploadFileToBackUp = (file, path) => {
  const storageRef = refStorage(storage, path);
  return uploadBytes(storageRef, file);
};

export const getFileURLFromBackUp = async (path) => {
  const storageRef = refStorage(storage, path);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};