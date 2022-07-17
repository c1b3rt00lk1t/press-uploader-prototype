import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";

const Dictionary = () => {
  const { handleUploadDictionary, handleGetDictionaryFromDB,handleDictionary } =
    useContext(PressUploaderContext);

  return (<>
  <h1>Dictionary</h1>
  <button onClick={handleGetDictionaryFromDB}>Get dictionary</button>
  <button onClick={handleDictionary("america",true,true)}>Set dictionary</button>
  <button onClick={handleUploadDictionary}>Send dictionary</button>
  
  </>)
};

export default Dictionary;
