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

const Results= ( props ) => {
    if ( props.ActorName !== undefined ) {
        return (
        <Stack
        p="0"
        borderWidth="0"
        direction="column"
        align="flex-start"
        >
            <Box
                className="flip-card"
                mt="5"
                width="300px"
                height="500px"
                >
                <Box
                    className="flip-card-inner"    
                    borderWidth="3px"
                    borderRadius="md"
                    >
                    <Box
                        className="flip-card-front"
                        bg="repeating-linear-gradient(50deg, #444, transparent, #444 500px)">
                        <VStack px="4">
                            <Heading as="h2" my="2" size="lg">
                                { props.ActorName }
                            </Heading>
                            <Image src={ props.ActorImage } alt={ props.ActorName } width="250px" />
                        </VStack>
                    </Box>
                    <Box
                        className="flip-card-back"
                        bg="radial-gradient(#000, rgb(71 9 9 / 50%))"
                        >
                        <VStack px="4">
                            <Heading as="h3" size="md" mt="5">Known for</Heading>
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
                    </Box>
                </Box>
            </Box>
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