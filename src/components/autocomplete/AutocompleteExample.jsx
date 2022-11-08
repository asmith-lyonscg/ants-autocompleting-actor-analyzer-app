import React, { useState } from "react";
import Autocomplete from "./Autocomplete";

const minCharactersToQuery = 3;
const maximumSuggestionsToShow = 7;
const searchSuggestions = [
   { name: "Bill Murray", id: "BM1", image: "https://image.tmdb.org/t/p/w500/nnCsJc9x3ZiG3AFyiyc3FPehppy.jpg" },
   { name: "Sandra Oh", id: "SO1", image: "https://image.tmdb.org/t/p/w500/5zF7u5UzsIXCvjbq5BXFMLmtbIy.jpg" },
   { name: "Samuel L. Jackson", id: "JR1", image: "https://image.tmdb.org/t/p/w500/nCJJ3NVksYNxIzEHcyC1XziwPVj.jpg" },
   { name: "James McAvoy", id: "JM1", image: "https://image.tmdb.org/t/p/w500/vB6qYlFXgONGVwwxWXE4gf0F8SQ.jpg" }
]

const AutocompleteExample = () => {
   const [suggestions, setSuggestions] = useState(searchSuggestions);

   const onSearchInputChange = (query) => {
      console.log(`Input changed to "${query}".`)
   }

   const onSuggestionSelected = (id) => {
      console.log(`Suggestion with ID "${id}" was selected.`)
      // just to demo the ability to change the dropdown restults dynamically: append a new list item on Select
      setSuggestions(searchSuggestions.concat(
         { name: "John C. Riley", id: "JR1", image: "https://image.tmdb.org/t/p/w500/iDQ8w4qcxU3le5ZWoCKpHs1QNok.jpg" }
      ))
   }

   return (
      <Autocomplete
         listItems={ suggestions }
         minCharacters={ minCharactersToQuery }
         maxSuggestions={ maximumSuggestionsToShow }
         onInputChangeCallback={ (q) => { onSearchInputChange(q) } }
         onSelectCallback={ onSuggestionSelected }
         menu_boxShadow="dark-lg"
         menu_borderWidth="1px"
         button_fontSize="16px"
         button_px={ 2 }
      />
   );
}

export default AutocompleteExample