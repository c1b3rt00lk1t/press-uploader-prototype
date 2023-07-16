import React from 'react'

const SearchBox = ({handleSearchBoxFocus, handleSearchBoxBlur}) => {
  return (
    <input style={{position: 'absolute', visibility: 'hidden'}} onChange={(ev) => {console.log(ev.target.value)}} onFocus={handleSearchBoxFocus} onBlur={handleSearchBoxBlur} placeholder="Type a zone, sector or tag..."></input>
  )
}

export default SearchBox