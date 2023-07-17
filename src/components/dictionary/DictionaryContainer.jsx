import React from 'react'
import Tree from "../Tree";
import { ErrorBoundary } from "../ErrorBoundary";


const DictionaryContainer = (
{
    handleSelectZones,
    selectedZones,
    handleUnfoldedZones,
    unfoldedZones,
    searched,
    dictionary,
    handleSelectSectors,
    selectedSectors,
    handleUnfoldedSectors,
    unfoldedSectors,
    handleSelectTags,
    selectedTags,
    handleUnfoldedTags,
    unfoldedTags,
    embed,
}

) => {
  return (
    <div
            className={`dictionary-container ${
              embed ? "" : "dictionary-container-smaller"
            }`}
          >
            <ErrorBoundary>
              {!!dictionary && (
                <Tree
                  inputs={{ zones: dictionary.zones }}
                  path={[]}
                  handleSelectItems={handleSelectZones}
                  selectedItems={selectedZones}
                  handleUnfoldedItems={handleUnfoldedZones}
                  unfoldedItems={unfoldedZones}
                  searched={searched.zones}
                />
              )}
            </ErrorBoundary>
            <ErrorBoundary>
              {!!dictionary && (
                <Tree
                  inputs={{ sectors: dictionary.sectors }}
                  path={[]}
                  handleSelectItems={handleSelectSectors}
                  selectedItems={selectedSectors}
                  handleUnfoldedItems={handleUnfoldedSectors}
                  unfoldedItems={unfoldedSectors}
                  searched={searched.sectors}
                />
              )}
            </ErrorBoundary>
            <ErrorBoundary>
              {!!dictionary && (
                <Tree
                  inputs={{ tags: dictionary.tags }}
                  path={[]}
                  handleSelectItems={handleSelectTags}
                  selectedItems={selectedTags}
                  handleUnfoldedItems={handleUnfoldedTags}
                  unfoldedItems={unfoldedTags}
                  searched={searched.tags}
                />
              )}
            </ErrorBoundary>
          </div>
  )
}

export default DictionaryContainer