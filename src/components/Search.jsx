import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export const Search = () => {
  return (
    <InputGroup ml={1} mt={1} mr={1} w='40vw' h={39} bg='RGBA(0, 0, 0, 0.08)'>
      <Input
        pr='4.5rem'
        type={'text'}
        placeholder='Busque o seu produto...'
      />
      <InputRightElement>
        <IconButton aria-label='Search database' bg='#2de2e6' icon={<SearchIcon />} />
      </InputRightElement>
    </InputGroup>
  )
}