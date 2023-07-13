// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as refDb, set, update, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";




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
const app = initializeApp(firebaseConfig, 'app');

/** Authorization */
const auth = getAuth(app);

export const authenticateUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return true;
  })
  .catch((error) => {
    return false
  });
}

export const signOutUser = () => {
  signOut(auth).then(() => {
    console.log("Logged out")
  }).catch((error) => {
    // An error happened.
  });
}


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


const writeData =  (path) => async (data,subpath) => {
  if(!subpath){
      subpath = ''
  }
  console.log(path + subpath)
  console.log(data)
  try {
    await set(refDb(database, path + subpath), data);
  } catch (error) {
    return false;
  }
  return true;
};
export const writeDataSession = writeData("/sessions/");
export const writeDataDictionary = writeData("/dictionary/");
export const writeDataSysSession = writeData("/sys/sessions/");

const updateData = (path) => async (data, subpath) =>{
  try {
    await update(refDb(database, path + subpath), data);
  } catch (error) {
    return false;
  }
  return true;
}

export const updateDataDictionary = updateData("/dictionary");

const getDataFromDB = (path) => (handleDataFromDB) => {
 
  const refDB = refDb(database, path);
   onValue(refDB,  (snapshot) => {
    const data =  snapshot.val();   
    handleDataFromDB(data);
  });
};

export const getDataFromDBSession =  getDataFromDB("/sessions/");
export const getDataFromDBDictionary =  getDataFromDB("/dictionary/");

