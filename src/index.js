import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from 'react-dom'
import App from './App'

const colors = {
    brand: { // blue 33 42 95 RGB    red 217 0 47
        700: '#212a5f', //blue
        500: '#d9002f', // red
    }
}
const customTheme = extendTheme({ colors })

ReactDOM.render(
    <ChakraProvider theme={customTheme}>
        <App />
    </ChakraProvider>,
    document.getElementById("root"))