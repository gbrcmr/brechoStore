import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import api from "../services/api"

export const Search = () => {

  const [term, setTerm] = useState('');

  const [data, setData] = useState();

  // const getStores = async () => {
  //   try {
  //     const response = await api.get("/store/search");

  //     setData(response.data)
  //     return response.data;
  //   } catch (error) {
  //     console.error("Erro ao buscar lojas", error);
  //     throw error;
  //   }

  // }

  // useEffect(() => {
  //   getStores();
  // }, []);

  useEffect(() => {
    //console.log(term)
  }, [term]);

  return (
    <InputGroup ml={1} mt={1} mr={1} w='40vw' h={39} bg='RGBA(0, 0, 0, 0.08)'>
      <Input
        pr='4.5rem'
        type={'text'}
        bg={'white'}
        placeholder='Busque o seu produto...'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <InputRightElement>
        <IconButton aria-label='Search database' bg='#82EEFD' icon={<SearchIcon />} />
      </InputRightElement>
    </InputGroup>
  )
}