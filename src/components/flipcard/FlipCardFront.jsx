import { Flex } from "@chakra-ui/react";
import React from "react";

const FlipCardFront = ( props ) => {
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

export default FlipCardFront