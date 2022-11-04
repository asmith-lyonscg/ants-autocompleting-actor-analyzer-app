
import "./styles.css";
import {ChakraProvider, Heading, Text, Box} from "@chakra-ui/react"
import Form from "./components/Form";
import customTheme from "./theme";

export default function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Box className="App" my={10}>
        <Heading as="h1">Ant's Autocompleting Actor Analyzer App</Heading>
        <Text>Implemented with React and Chakra-UI</Text>
        <Form />
      </Box>
    </ChakraProvider>
  );
}
