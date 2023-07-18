import React, { useEffect, useState } from "react";

const SearchBox = ({
  handleSearchBoxFocus,
  handleSearchBoxBlur,
  setUnfoldedZones,
  setUnfoldedTags,
  setUnfoldedSectors,
  setAllUnfoldedEmpty,
  setSearched,
  searched,
  handleSelectItems,
  dictionary,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [flatZones, setFlatZones] = useState([]);
  const [flatSectors, setFlatSectors] = useState([]);
  const [flatTags, setFlatTags] = useState([]);

  useEffect(() => {
      // temp variables for destructring any of the three trees
      const zones = [];
      const sectors = [];
      const tags = [];

      // generic recursive function for destructring any of the three trees
      const destructureItems = (target) => (path) => (object) => {
        for (let [prop, value] of Object.entries(object)) {
          if (typeof value === "object") {
            // `${path}/${prop}` is kept in order to unfold also the target subfolder
            // to avoid this behavior and be more restrictive with unfolding, the /${prop} could be removed
            target.push({ item: prop, path: `${path}/${prop}` });
            destructureItems(target)(`${path}/${prop}`)(value);
          } else if (typeof value === "boolean") {
            target.push({ item: prop, path: `${path}` });
          }
        }
        return target;
      };

      // the result of the calculation is stored in the corresponding states
      setFlatZones(destructureItems(zones)("zones")(dictionary.zones));
      setFlatSectors(destructureItems(sectors)("sectors")(dictionary.sectors));
      setFlatTags(destructureItems(tags)("tags")(dictionary.tags));
  },[dictionary.sectors, dictionary.tags, dictionary.zones])
  


  const handleChangeSearchBox = (ev) => {
    setInputValue(ev.target.value);
    // if the length of the input is below the 2 characters, everything is kept folded
    if (ev.target.value.length < 2) {
      setAllUnfoldedEmpty();
      setSearched([]);
      return;
    }

    // it gets the event target value and filters with it the list of items to obtain their path
    // the result is an array of strings that has to be joined in a string first
    // and then split in order to get the desired format of an array of separated items
    // the destructuring of Set is used to avoid duplicates
    const toBeUnfolded = (items) => [
      ...new Set(
        items
          .filter(({ item }) => item.includes(ev.target.value))
          .map(({ path }) => path)
          .join("/")
          .split("/")
      ),
    ];

    // reset unfolded items
    setAllUnfoldedEmpty();

    // Once the zones to be unfolded are identified, they are unfolded by the basic setter function called in a functional way and preventing duplicates to be stored (they wouldn't break anything but are not clean)
    toBeUnfolded(flatZones).forEach((unfold) =>
      setUnfoldedZones((prev) => [...new Set(prev.concat(unfold))])
    );
    toBeUnfolded(flatSectors).forEach((unfold) =>
      setUnfoldedSectors((prev) => [...new Set(prev.concat(unfold))])
    );
    toBeUnfolded(flatTags).forEach((unfold) =>
      setUnfoldedTags((prev) => [...new Set(prev.concat(unfold))])
    );

    // a list of searched items is stored differentiating zones, sectors and tags as props of an object
    const searching = (items) => [
      ...new Set(
        items
          .filter(({ item }) => item.includes(ev.target.value))
          .map(({ item }) => item)
          .join("/")
          .split("/")
      ),
    ];

    setSearched([
      ...new Set(
        searching(flatZones)
          .concat(searching(flatSectors))
          .concat(searching(flatTags))
          .filter((item) => item !== "")
      ),
    ]);

    // A scroll into view is send to the event queue to be executed after the re-render
    setTimeout(() => document.getElementById("dictionary-scroll").click(), 0);
  };

  const checkItem = () => {
    // The function will only check the item if there is only one possible sector, tag or zone
    if (searched.length === 1 && searched[0].includes(inputValue)) {

      // It has to be determined if the searched string corresponds to a sector, tag or zone
      const isZone = flatZones.map(({ item }) => item).includes(searched[0]);
      const isSector = flatSectors
        .map(({ item }) => item)
        .includes(searched[0]);
      const isTag = flatTags.map(({ item }) => item).includes(searched[0]);

      // The setter function to select a zone, sector or tag is called conditionally
      isZone &&
        handleSelectItems.zones(
          flatZones
            .filter(({ item }) => item === searched[0])
            .flatMap(({ item, path }) => path.split("/").concat(item))
        );
      isSector &&
        handleSelectItems.sectors(
          flatSectors
            .filter(({ item }) => item === searched[0])
            .flatMap(({ item, path }) => path.split("/").concat(item))
        );
      isTag &&
        handleSelectItems.tags(
          flatTags
            .filter(({ item }) => item === searched[0])
            .flatMap(({ item, path }) => path.split("/").concat(item))
        );

      // When an item is checked in, the searchbox content is cleaned up
      setInputValue("");
      setSearched([]);
    }
  };

  return (
    <>
      <input
        className="dictionary-search-box"
        value={inputValue}
        onChange={handleChangeSearchBox}
        onFocus={handleSearchBoxFocus}
        onBlur={handleSearchBoxBlur}
        placeholder="Type a zone, sector or tag..."
      ></input>
      <button
        id="dictionary-search-box-check"
        onClick={checkItem}
        style={{ visibility: "hidden", position: "absolute" }}
      ></button>
    </>
  );
};

export default SearchBox;
