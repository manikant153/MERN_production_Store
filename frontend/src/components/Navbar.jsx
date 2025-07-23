import { Container, Flex ,HStack,Text,Button, useColorMode} from '@chakra-ui/react'
import {Link } from 'react-router-dom'
import { CiSquarePlus } from 'react-icons/ci';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


// 
const Navbar = () => {

  // here useColorMode is hook of chakra-ui of react used to switch between two color
  // colorMode is variable and toggleColorMode is function form chakra-ui/react package
  const {colorMode, toggleColorMode} =useColorMode();
  return <Container maxW="1140px" px={4}>
      <Flex
      h="60px"
       alignItems="center"
       justifyContent="space-between"
       flexDir={{
        base:"column",
        sm:"row"
       }}
       >
        <Text
        fontSize={{base:"22px",sm:"28px"}}
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
        >
          <Link to={"/"}>Product Store 🛒</Link>

        </Text>
        <HStack spacing={2} alignItems="center">
          <Link to={"/create"}>
          <Button><CiSquarePlus /></Button>
          </Link>

          //here we are calling the toggleColorMode function 
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <IoMoon/>:<LuSun/>}
        </Button>
        </HStack>
      </Flex>

    </Container>;
}

export default Navbar