import { Box } from "@chakra-ui/react";
import React from "react";

const FlipCard = ( props ) => {
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

export default FlipCard