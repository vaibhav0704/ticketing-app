import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const customTheme = extendTheme(withDefaultColorScheme({ 
  colorScheme: 'white',
}))

export default customTheme;