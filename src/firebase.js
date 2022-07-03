// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL  } from "firebase/storage";
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
  databaseURL: "https://press-uploader-default-rtdb.europe-west1.firebasedatabase.app/",
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

export const getFileURL = async (path) =>{
  const storageRef = refStorage(storage, path);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/** Real time database */

// Just for first checks, the data to update should be sent as parameter

export const writeData = (  ) => {
  
  const data = [
    {
        "date": "20220525",
        "source": "Expansión",
        "title": "Lluvia global de dividendos en el mundo 1,44 billones",
        "order": 2,
        "session": "20220605",
        "zones": [
            "global"
        ],
        "sectors": [
            "economía"
        ],
        "tags": [
            "dividendos"
        ],
        "others": [],
        "id": "202206052",
        "name": "Z20220605/Economía/20220525 - Expansión - Lluvia global de dividendos en el mundo 1,44 billones.pdf",
        "url": "https://firebasestorage.googleapis.com/v0/b/press-uploader.appspot.com/o/Z20220605%2FEconom%C3%ADa%2F20220525%20-%20Expansi%C3%B3n%20-%20Lluvia%20global%20de%20dividendos%20en%20el%20mundo%201%2C44%20billones.pdf?alt=media&token=5e541e33-0462-492a-bdc9-54eefcbef8d8"
    },
    {
        "date": "20220531",
        "source": "Expansión",
        "title": "Ola de subidas de tipos de interés en los bancos centrales del mundo",
        "order": 3,
        "session": "20220605",
        "zones": [
            "global"
        ],
        "sectors": [
            "economía",
            "financiero"
        ],
        "tags": [
            "política monetaria",
            ""
        ],
        "others": [],
        "id": "202206053",
        "name": "Z20220605/Economía/20220531 - Expansión - Ola de subidas de tipos de interés en los bancos centrales del mundo.pdf",
        "url": "https://firebasestorage.googleapis.com/v0/b/press-uploader.appspot.com/o/Z20220605%2FEconom%C3%ADa%2F20220531%20-%20Expansi%C3%B3n%20-%20Ola%20de%20subidas%20de%20tipos%20de%20inter%C3%A9s%20en%20los%20bancos%20centrales%20del%20mundo.pdf?alt=media&token=931c5ec4-1575-49e9-b3de-385bff1624f5"
    },
    {
        "date": "20220526",
        "source": "Expansión",
        "title": "La Fed, a favor de endurecer más la política monetaria",
        "order": 4,
        "session": "20220605",
        "zones": [],
        "sectors": [],
        "tags": [],
        "others": [],
        "id": "202206054",
        "name": "Z20220605/Economía/20220526 - Expansión - La Fed, a favor de endurecer más la política monetaria.pdf",
        "url": "https://firebasestorage.googleapis.com/v0/b/press-uploader.appspot.com/o/Z20220605%2FEconom%C3%ADa%2F20220526%20-%20Expansi%C3%B3n%20-%20La%20Fed%2C%20a%20favor%20de%20endurecer%20m%C3%A1s%20la%20pol%C3%ADtica%20monetaria.pdf?alt=media&token=51818087-f7b3-4de8-9297-e2ccabe0c0aa"
    },
    {
        "date": "20220524",
        "source": "Expansión",
        "title": "Lagarde anticipa el fin de los tipos negativos en septiembre",
        "order": 5,
        "session": "20220605",
        "zones": [],
        "sectors": [],
        "tags": [],
        "others": [],
        "id": "202206055",
        "name": "Z20220605/Economía/20220524 - Expansión - Lagarde anticipa el fin de los tipos negativos en septiembre.pdf",
        "url": "https://firebasestorage.googleapis.com/v0/b/press-uploader.appspot.com/o/Z20220605%2FEconom%C3%ADa%2F20220524%20-%20Expansi%C3%B3n%20-%20Lagarde%20anticipa%20el%20fin%20de%20los%20tipos%20negativos%20en%20septiembre.pdf?alt=media&token=655426a0-66c2-47c1-bcba-c0e9e4b6655c"
    },
    {
        "date": "20220527",
        "source": "Expansión",
        "title": "Los bancos ingresarán 1.800 millones extras con el alza de tipos este año",
        "order": 6,
        "session": "20220605",
        "zones": [],
        "sectors": [],
        "tags": [],
        "others": [],
        "id": "202206056",
        "name": "Z20220605/Economía/20220527 - Expansión - Los bancos ingresarán 1.800 millones extras con el alza de tipos este año.pdf",
        "url": "https://firebasestorage.googleapis.com/v0/b/press-uploader.appspot.com/o/Z20220605%2FEconom%C3%ADa%2F20220527%20-%20Expansi%C3%B3n%20-%20Los%20bancos%20ingresar%C3%A1n%201.800%20millones%20extras%20con%20el%20alza%20de%20tipos%20este%20a%C3%B1o.pdf?alt=media&token=103aa767-21bb-41d6-8395-65dc7f06cf46"
    }]


  set(refDb(database, '/' ), data);
}

