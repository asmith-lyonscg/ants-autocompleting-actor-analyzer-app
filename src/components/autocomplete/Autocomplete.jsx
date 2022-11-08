import { React, useState, useRef } from 'react';
import { Avatar, Input, Button, Box, VStack, InputGroup } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const Autocomplete = ( props ) => {

   const [query, setQuery] = useState( props.value || "" )
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const inputRef = useRef(null);

   const minCharacters = props.minCharacters || 3;
   const maxSuggestions = props.maxSuggestions || 8;
   const showAvatar = typeof props.showAvatar !== "undefined" ? props.showAvatar : true
   const inputLeft = props.inputLeft || null;
   const inputRight = props.inputRight || null;

   const menuProps = propNameSpace("menu", props) // ex: menu_borderColor="gray.200"
   const buttonProps = propNameSpace("button", props)
   const avatarProps = propNameSpace("avatar", props)

   // Default handler functions. These are override-able, but it's not adviseable.

   const inputOnChange = (e) => {
      setQuery(e.target.value)
      props.onInputChangeCallback(e.target.value)
      if (e.target.value.length >= minCharacters) {
         setIsMenuOpen(true)
      } else {
         setIsMenuOpen(false)
      }
   }

   const inputOnKeyDown = (e) => {
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

   const inputOnBlur = (e) => {
      const menu = document.querySelector("[role=menu]")
      setTimeout(() => {
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
      setQuery(name)
      props.onSelectCallback(id)
   }

   // The following are all override-able props, but will work well with the default values. Be careful overriding event handlers.
   const id = props.id || "autocompleteinput",
         type = props.text || "text",
         placeholder = props.placeholder || "Search",
         autoComplete = props.autoComplete || "off", // this is the native <input> attribute to prevent browser autofills
         onChange = props.onChange || inputOnChange,
         onKeyDown = props.onKeyDown || inputOnKeyDown,
         onBlur = props.onBlur || inputOnBlur,
         menu_display = props.menu_display || isMenuOpen ? "block" : "none",
         menu_pos = props.menu_pos || "absolute",
         menu_minWidth = props.menu_minWidth || "100%",
         menu_bg = props.menu_bg || "gray.800",
         menu_border = props.menu_border || "1px solid gray",
         menu_borderColor = props.menu_borderColor || "gray.700",
         menu_zIndex = props.menu_zIndex || "1",
         menu_role = props.menu_role || "menu", // this is applied to the nested div for VStack
         button_variant = props.button_variant || "ghost",
         button_width = props.button_width || "100%",
         button_justifyContent = props.button_justifyContent || "flex-start",
         button_borderRadius = props.button_borderRadius || "0",
         button_bg = props.button_bg || "gray.800",
         button__hover = props.button__hover || { bg: "gray.700" },
         button__focus = props.button__focus || { bg: "gray.700", outline: "none"  },
         button_onKeyDown = props.button_onKeyDown || menuKeyDownCallback,
         button_onClick = props.button_onClick || menuSelectionCallback,
         avatar_size = props.avatar_size || "sm",
         avatar_mr = props.avatar_mr || "3"

   let items = props.listItems
   items.length = Math.min(items.length, maxSuggestions)

   return (
      <Box pos="relative">
         <InputGroup>
            { inputLeft }
            <Input
               ref={inputRef}
               id={ id }
               type={ type }
               placeholder={ placeholder }
               value={ query }
               onChange={ onChange }
               onKeyDown={ onKeyDown }
               onBlur={ onBlur }
               autoComplete={ autoComplete }
               { ...props }/>
            { inputRight }
         </InputGroup>
         <Box
            display={ menu_display }
            pos={ menu_pos }
            minWidth={ menu_minWidth }
            bg={ menu_bg }
            border={ menu_border }
            borderColor={ menu_borderColor }
            zIndex={ menu_zIndex }
            {...menuProps}>
            <VStack role={ menu_role }>
               {
                  items.map((listItem, i) => {
                     return (
                        <Button
                           key={ listItem.id }
                           value={ listItem.id }
                           variant={ button_variant }
                           width={ button_width }
                           justifyContent={ button_justifyContent }
                           borderRadius={ button_borderRadius }
                           bg={ button_bg }
                           _hover={ button__hover }
                           _focus={ button__focus }
                           onKeyDown={ button_onKeyDown }
                           onClick={ button_onClick }
                           {...buttonProps}>

                           { showAvatar && (
                              <Avatar
                                 size={ avatar_size }
                                 mr={ avatar_mr }
                                 name={listItem.name}
                                 src={listItem.image}
                                 {...avatarProps} />
                           ) }

                           {listItem.name}
                        </Button>
                     )
                  })
               }
            </VStack>
         </Box>
      </Box>
   );
}

export default Autocomplete

// Create name spaced Chakra-UI props.  Usage ex: menu_borderWidth, button_px, etc
function propNameSpace(namespace, props) {
   const nameSpacedProps = Object.keys(props)
      .filter((key) => key.startsWith(`${namespace}_`))
      .reduce((obj, key) => {
         let splitKey = key.replace(`${namespace}_`, "")
         const newKey = splitKey.charAt(0).toLowerCase() + splitKey.slice(1);
         const newProp = props[key]
         return Object.assign(obj, {
            [newKey]: newProp
         });
      }, {});
   return nameSpacedProps
}


Autocomplete.displayName = 'Autocomplete'

Autocomplete.propTypes = {
   /**
    * Array of items to show in the suggestion dropdown. Each item object must follow the format of: {id: 'a unique ID', image: '(optional) an img src to display as a thumbnail', name: 'the display text' }
    */
   listItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string
   })).isRequired,
   /**
    * Callback function that is hit every time the input field value changes
    */
   onInputChangeCallback: PropTypes.func.isRequired,
   /**
    * Callback function called when a suggestion item is selected with enter or click
    */
   onSelectCallback: PropTypes.element.isRequired,
   /**
    * Number of characters that must be present in the input field before the menu visibility is triggered. default is 3.
    */
   minCharacters: PropTypes.number,
   /**
    * Hard cap on the number of suggestion items to visually render in the dropdown. default is 8.
    */
   maxSuggestions: PropTypes.number,
   /**
    * Set to { false } to turn avatars (thumbnail images) off.  default is true.
    */
   showAvatar: PropTypes.bool,
   /**
    * Optional node to render inside the <InputGroup> wrapper, before the <Input> field node
    */
   inputLeft: PropTypes.node,
   /**
    * Optional node to render inside the <InputGroup> wrapper, after the <Input> field node
    */
   inputRight: PropTypes.node,
}

Autocomplete.defaultProps = {
   minCharacters: 3,
   maxSuggestions: 8,
   showAvatar: true
}
