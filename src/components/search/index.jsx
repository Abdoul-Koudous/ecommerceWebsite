import React from 'react';
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className='searchBox'>
        <input type="text" placeholder='Rechercher les produits...' />
        <button><IoSearch /></button>
    </div>
  )
}

export default Search