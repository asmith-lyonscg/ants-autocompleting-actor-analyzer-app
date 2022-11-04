
import React from "react";
import { FlipCard, FlipCardFront, FlipCardBack } from "./FlipCard"

const FlipCardExample = () => {
    return (
        <FlipCard height="150px" width="150px">
            <FlipCardFront bg="blue.900">Hello</FlipCardFront>
            <FlipCardBack bg="red.900">Good-Bye</FlipCardBack>
        </FlipCard>
    )
}

export default FlipCardExample