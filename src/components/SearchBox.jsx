import React from "react";

const SearchBox = ({
  handleSearchBoxFocus,
  handleSearchBoxBlur,
  setUnfoldedZones,
  setUnfoldedTags,
  setUnfoldedSectors,
  setAllUnfoldedEmpty,
  setSearched,
  dictionary,
}) => {
  const handleChangeSearchBox = (ev) => {
    // if the length of the input is below the 3 characters, everything is kept folded
    if (ev.target.value.length < 3) {
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

    // a list of searched items is consolidated between zones, sectors and tags, filtering out empty strings
    const searching = (items) => [
      ...new Set(
        items
          .filter(({ item }) => item.includes(ev.target.value))
          .map(({ item }) => item)
          .join("/")
          .split("/")
      ),
    ];
    setSearched(
      searching(zones)
                .concat(searching(sectors))
                .concat(searching(tags))
                .filter(item => item.length > 1)
    );
  };

  return (
    <input
      className="dictionary-search-box"
      onChange={handleChangeSearchBox}
      onFocus={handleSearchBoxFocus}
      onBlur={handleSearchBoxBlur}
      placeholder="Type a zone, sector or tag..."
    ></input>
  );
};

export default SearchBox;
