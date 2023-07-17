import React from "react";

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
  const handleChangeSearchBox = (ev) => {
    
    // if the length of the input is below the 2 characters, everything is kept folded
    if (ev.target.value.length < 2) {
      setAllUnfoldedEmpty();
      setSearched([]);
      return;
    }

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
    };

    destructureItems(zones)("zones")(dictionary.zones);
    destructureItems(sectors)("sectors")(dictionary.sectors);
    destructureItems(tags)("tags")(dictionary.tags);

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
    toBeUnfolded(zones).forEach((unfold) =>
      setUnfoldedZones((prev) => [...new Set(prev.concat(unfold))])
    );
    toBeUnfolded(sectors).forEach((unfold) =>
      setUnfoldedSectors((prev) => [...new Set(prev.concat(unfold))])
    );
    toBeUnfolded(tags).forEach((unfold) =>
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
   
    setSearched([...new Set(searching(zones).concat(searching(sectors)).concat(searching(tags)).filter(item => item !== ''))]);

    // A scroll into view is send to the event queue to be executed after the re-render
    setTimeout(() => document.getElementById('dictionary-scroll').click(), 0);
    
  };

  // const checkItem = () => {
  //   // The first item selected for each category (sector, tag, zone) is checked
  //   handleSelectItems.zones(searched.zones);
  //   handleSelectItems.sectors(searched.sectors);
  //   handleSelectItems.tags(searched.tags);
  //   // When an item is checked in, the searchbox content is cleaned up
  //   setTimeout( () => {
  //   document.querySelector('.dictionary-search-box').value="";
  //   setAllUnfoldedEmpty();
  //   setSearched([]);
  //   }, 0);
  // };

  return (
    <>
    <input
      className="dictionary-search-box"
      onChange={handleChangeSearchBox}
      onFocus={handleSearchBoxFocus}
      onBlur={handleSearchBoxBlur}
      placeholder="Type a zone, sector or tag..."
    ></input>
    {/* <button id="dictionary-search-box-check" onClick={checkItem} style={{visibility:"hidden", position: "absolute"}}></button> */}
    </>
  );
};

export default SearchBox;
