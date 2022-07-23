import React, {useContext} from "react";
import Dictionary from "../components/dictionary/Dictionary";
import PressUploaderContext from "../contexts/PressUploaderContext";

const DictionaryPage = () => {
  const {
    authenticated,
  
  } = useContext(PressUploaderContext);

  return (
    <div style={{margin:"0 auto",width:"17.5vw",marginTop:"1vh"}}>
     {authenticated &&  <Dictionary
        embed={false}
        selectedFile={false}
        handleZonesChangeDictionary={() => {}}
        handleSectorsChangeDictionary={() => {}}
        handleTagsChangeDictionary={() => {}}
        handleResetDictionary={() => {}}
      />}
    </div>
  );
};

export default DictionaryPage;
