import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import "./flipcard.css";

export const FlipCard = ( props ) => {
    if ( props.children !== undefined ) {

        const width = props.width || "300px",
            height = props.height || "500px" ,
            borderWidth = props.borderWidth || "3px",
            borderRadius = props.borderRadius || "md"

        return (
            <Box
                className="flip-card"
                width={ width }
                height={ height }
                >
                <Box
                    className="flip-card-inner"    
                    borderWidth={ borderWidth }
                    borderRadius={ borderRadius }
                    { ...props }>
                    { props.children }
                </Box>
            </Box>
        )
    }
}

export const FlipCardFront = ( props ) => {
    if ( props.children !== undefined ) {
        const bg = props.bg || "repeating-linear-gradient(50deg, #444, transparent, #444 500px)"
        const align = props.align || "center"
        const justify = props.justify || "center"
        return (
            <Flex
                className="flip-card-front"
                bg={ bg }
                align={ align }
                justify={ justify }
                { ...props }>
                { props.children }
            </Flex>
        )
    }
}

export const FlipCardBack = ( props ) => {
    if ( props.children !== undefined ) {
        const bg = props.bg || "radial-gradient(#000, rgb(71 9 9 / 50%))"
        const align = props.align || "center"
        const justify = props.justify || "center"
        return (
            <Flex
                className="flip-card-back"
                bg={ bg }
                align={ align }
                justify={ justify }
                { ...props }>
                { props.children }
            </Flex>
        )
    }
}