/**
 * LOGIC FOR THE BACKUP PROJECT
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

// Secondary Firebase project configuration (for demo purposes)
const firebaseConfig = {
  apiKey: "AIzaSyCHqz9wa0g7dNabhkPn_Pc6pG588Bl_O7c",
  authDomain: "press-uploader-afe86.firebaseapp.com",
  projectId: "press-uploader-afe86",
  storageBucket: "press-uploader-afe86.appspot.com",
  messagingSenderId: "1087909215520",
  appId: "1:1087909215520:web:73d7567ca71d508ff4ab45",
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig, "app2");

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
  // From the backup, also the size is gotten
  const fileSizeBytes = await getMetadata(storageRef).then(
    (metadata) => metadata.size
  );
  return { url: downloadURL, size: fileSizeBytes };
};
