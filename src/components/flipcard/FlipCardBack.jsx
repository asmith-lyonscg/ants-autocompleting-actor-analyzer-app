import { Flex } from "@chakra-ui/react";
import React from "react";

const FlipCardBack = ( props ) => {
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

export default FlipCardBack