import { Box, Button, HStack, InputLeftElement, useToast } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState } from "react";
import { MovieDB as moviedb, getActorSearchSuggestions, getActorByID, getTopActorObject, getActorName, getActorImage, getMovieName, getMovieImage, getMoviesKnownFor } from '../api/TMDB';
import Results from "./Results";
import Autocomplete from "./autocomplete/Autocomplete";

const minCharactersToQuery = 3;
const maximumSuggestionsToShow = 7;

const Builder = () => {
   const toast = useToast();
   const [lastApiResponse, setLastApiResponse] = useState([]);
   const [suggestions, setSuggestions] = useState([]);
   const [actorQuery, setActorQuery] = useState([]);
   const [actorName, setActorName] = useState([])
   const [actorImage, setActorImage] = useState([])
   const [moviesKnownfor, setMoviesKnownFor] = useState([])
   const [result, setResult] = useState(null);

   const displayActor = (actorObj) => {
      if (typeof actorObj !== "object") return null
      const aName = getActorName(actorObj)
      const aImage = getActorImage(actorObj, "500")
      const movies = [];
      getMoviesKnownFor(actorObj).forEach((mov) => {
         movies.push({name: getMovieName(mov), poster: getMovieImage(mov)})
      })
      setActorName(aName)
      setActorImage(aImage)
      setMoviesKnownFor(movies)
      setResult( {name: aName, image: aImage, movies: movies} )
      console.log(aName, aImage, movies)
   }

   const selectSuggestedActor = (id) => {
      let actorObj = getActorByID(id, lastApiResponse)
      displayActor(actorObj)

      toast({
         title: "Success!",
         status: "success",
         duration: 3000,
         isClosable: true
      });
   };
   
   const submitSearch = (query) => {
      moviedb.searchPerson(query)
         .then((response) => {
            // console.log("API CALLED")
            setLastApiResponse(response)
            const topActor = getTopActorObject(response)
            displayActor(topActor)
         })
         .catch(console.error)

      toast({
         title: "Submitted!",
         status: "success",
         duration: 3000,
         isClosable: true
      });
   };

   const onSearchInputChange = (query) => {
      setActorQuery(query)
      
      // Autocomplete search suggestions API call
      if (query.length >= minCharactersToQuery) {
         moviedb.searchPerson(query)
            .then((response) => {
               console.log("API CALLED")
               setLastApiResponse(response)
               let returnredSuggestions = getActorSearchSuggestions(response)
               setSuggestions( returnredSuggestions )
            })
      }
   }

   return (
      <Box>
         <form onSubmit={ (e) => {
            e.preventDefault()
            submitSearch(actorQuery)
            } }>
            <HStack justifyContent="center">
               <Autocomplete
                  listItems={ suggestions }
                  minCharacters={ minCharactersToQuery }
                  maxSuggestions={ maximumSuggestionsToShow }
                  onInputChangeCallback={ (val) => { onSearchInputChange(val) } }
                  onSelectCallback={ selectSuggestedActor }
                  inputLeft={
                     <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.500' />}
                     />
                  }
                  menu_boxShadow="dark-lg"
                  button_fontSize="15px"
               />
               <Button borderRadius="md"
                  bg="cyan.600"
                  _hover={{ bg: "cyan.200" }}
                  variant="ghost"
                  type="submit">
                  Submit
               </Button>
            </HStack>
         </form>
         {result && (
            <Results
               ActorName={actorName}
               ActorImage={actorImage}
               KnownFor={moviesKnownfor}
            />
         )}
      </Box>
   );
}

export default Builder