import {
   React,
   useState,
   useRef,
} from 'react';
import {
   Avatar,
   Input,
   Button,
   Box,
   VStack,
} from "@chakra-ui/react";

const SuggestionMenu = ( {listItems, minCharacters, maxSuggestions, setInputQuery, submitFunc} ) => {
   const [query, setQuery] = useState('')
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   // const [menuItemSelected, setMenuItemSelected] = useState(null)
   const inputRef = useRef(null);
   const onQueryUpdate = (queryText, callback) => {
      setQuery(queryText)
      setInputQuery(queryText, () => {
         if (typeof callback === "function") {
            callback()
         }
      })
   }
   let items = listItems
   items.length = Math.min(items.length, maxSuggestions)

   const inputKeyDownCallback = (e) => {
      if (e.key === "ArrowDown") {
         e.preventDefault()
         const menu = document.querySelector("[role=menu]")
         menu.firstElementChild.focus();
      } else if (e.key === "ArrowUp") {
         e.preventDefault()
         const menu = document.querySelector("[role=menu]")
         menu.lastElementChild.focus()
      }
   }
   const inputOnChangeCallback = (e) => {
      onQueryUpdate(e.target.value)
      if (e.target.value.length >= minCharacters) {
         setIsMenuOpen(true)
      } else {
         setIsMenuOpen(false)
      }
   }
   const inputOnBlurCallback = (e) => {
      const menu = document.querySelector("[role=menu]")
      setTimeout( () => {
         if (!menu.parentElement.contains(document.activeElement)) {
            setIsMenuOpen(false)
         }
      }, 1)
   }
   const menuKeyDownCallback = (e) => {
      if (e.key === "ArrowDown") {
         e.preventDefault()
         const nextMenuItem = e.target.nextSibling
         if (nextMenuItem) {
            nextMenuItem.focus()
         } else {
            inputRef.current.focus()
         }
      }
      if (e.key === "ArrowUp") {
         e.preventDefault()
         const prevMenuItem = e.target.previousSibling
         if (prevMenuItem) {
            prevMenuItem.focus()
         } else {
            inputRef.current.focus()
         }
      }
   }

   const menuSelectionCallback = (e) => {
      setIsMenuOpen(false)
      const name = e.target.textContent || e.target.innerText
      const id = e.target.value
      // setMenuItemSelected(name)
      setQuery(name)
      // onQueryUpdate(name)
      // e.target.closest("form").submit() // doesn't work. submits too early.
      submitFunc(id)
   }

   return (
      <Box pos="relative">
         <Input
            ref={ inputRef }
            id="queryactor"
            type="text"
            placeholder="Actor name"
            value={query}
            onChange={ inputOnChangeCallback }
            onKeyDown={ inputKeyDownCallback }
            onBlur={ inputOnBlurCallback }
            autoComplete="off"
         />
         
         <Box
            display={ isMenuOpen ? "block" : "none" }
            pos="absolute"
            minWidth="100%"
            bg="gray.800"
            border="1px solid gray"
            borderColor="gray.700"
            zIndex="1"
            >
            <VStack id="searchsuggestions" role="menu">
            {
               items.map((listItem, i) => {
                  return (
                     <Button
                        key={ listItem.aid }
                        value={ listItem.aid }
                        variant="ghost"
                        width="100%"
                        justifyContent="flex-start"
                        borderRadius="0"
                        bg="gray.800"
                        _hover={{ bg: "gray.700" }}
                        _focus={{ bg: "gray.700", outline: "none" }}
                        onKeyDown={ menuKeyDownCallback }
                        onClick={ menuSelectionCallback }
                        >
                        <Avatar size="sm" mr="3" name={ listItem.name } src={ listItem.image } />
                        { listItem.name }
                     </Button>
                  )
               })
            }
            </VStack>
         </Box>
      </Box>
   );
}

export default SuggestionMenu