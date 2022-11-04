import {
    Box,
    Heading,
    HStack,
    Image,
    Stack,
    Tag,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import "@fontsource/caveat";
import { FlipCard, FlipCardFront, FlipCardBack } from "./flipcard/FlipCard"

const Results= ( props ) => {
    if ( props.ActorName !== undefined ) {
        return (
        <Stack
        p="0"
        mt="5"
        borderWidth="0"
        direction="column"
        align="flex-start">
            <FlipCard>
                <FlipCardFront>
                    <VStack px="4">
                        <Heading as="h2" my="2" size="lg">
                            { props.ActorName }
                        </Heading>
                        <Image src={ props.ActorImage } alt={ props.ActorName } width="250px" />
                    </VStack>
                </FlipCardFront>
                <FlipCardBack>
                    <VStack px="4">
                        <Heading as="h3" size="md" mt="-6">Known for</Heading>
                        { props.KnownFor.map((mov, i) => {
                            return (
                            <Tag key={ i } p="2" width="100%">
                                <HStack>
                                    <Image boxSize="50px" objectFit="cover" src={ mov.poster } alt={ mov.name } />
                                    <p align="left"><i>{ mov.name }</i></p>
                                </HStack>
                            </Tag>
                            )
                        }) }
                    </VStack>
                </FlipCardBack>
            </FlipCard>
        </Stack>
        );
    } else {
        return (
        <Box mt={5}>
            <Stack
            p={4}
            borderWidth="3px"
            borderRadius="md"
            direction="column"
            align="flex-start"
            >
                <VStack>
                    <Heading my={2} as="h4" fontSize="20px">
                        No Match
                    </Heading>
                </VStack>
            </Stack>
        </Box>
        );
    }
}

export default Results