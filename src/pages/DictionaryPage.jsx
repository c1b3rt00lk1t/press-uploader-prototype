import React from "react";
import Dictionary from "../components/Dictionary";

const DictionaryPage = () => {
  return (
    <div style={{margin:"0 auto",width:"17.5vw",marginTop:"1vh"}}>
      <Dictionary
        embed={false}
        selectedFile={false}
        handleZonesChangeDictionary={() => {}}
        handleSectorsChangeDictionary={() => {}}
        handleTagsChangeDictionary={() => {}}
        handleResetDictionary={() => {}}
      />
    </div>
  );
};

export default DictionaryPage;
