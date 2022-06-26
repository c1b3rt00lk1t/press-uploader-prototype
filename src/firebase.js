// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlDzlrEY-VkPZdNkEZOTSbrLJcL2LoQTo",
  authDomain: "press-uploader.firebaseapp.com",
  projectId: "press-uploader",
  storageBucket: "press-uploader.appspot.com",
  messagingSenderId: "496555378224",
  appId: "1:496555378224:web:323bd87185f34dfe5c8ff5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


export const uploadFile = (file, path) => {
  const storageRef = ref(storage, path);

  return uploadBytes(storageRef, file);
  // getDownloadURL(snapshot.ref).then((downloadURL) => {
  //   console.log('File available at', downloadURL);
  // });
};

export const getFileURL = async (path) =>{
  const storageRef = ref(storage, path);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
  

}

