
import React from "react";
import FlipCard from "./flipcard/FlipCard"
import FlipCardFront from "./flipcard/FlipCardFront"
import FlipCardBack from "./flipcard/FlipCardBack"

export default function FlipCardExample() {
    return (
        <FlipCard height="150px" width="150px">
            <FlipCardFront bg="blue.900">Hello</FlipCardFront>
            <FlipCardBack bg="red.900">Good-Bye</FlipCardBack>
        </FlipCard>
    )
}
