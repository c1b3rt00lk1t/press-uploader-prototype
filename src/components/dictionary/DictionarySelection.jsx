/* eslint-disable react/prop-types */
import React from 'react'

const DictionarySelection = ({selectedZones, selectedSectors, selectedTags}) => {
  return (
    <div className="dictionary-selection">
          <div>
            <b>zones: </b>
            {selectedZones.join(", ")}
          </div>
          <div>
            <b>sectors: </b>
            {selectedSectors.join(", ")}
          </div>
          <div>
            <b>tags: </b>
            {selectedTags.join(", ")}
          </div>
        </div>
  )
}

export default DictionarySelection