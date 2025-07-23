import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();


  const {createProduct,products} = useProductStore();

  const handleProduct = async () =>{
    
    // console.log(newProduct);
   const{success,message} = await createProduct(newProduct);
   console.log("Success: ",success);
   console.log("message: ",message);
   if(!success){
    toast({
      title:'Error',
      description:message,
      status:'error',
      isClosable:true
    });
   } else{
    toast({
      title:'success',
      description:message,
      status:'success',
      isClosable:true
    })
   }
   setNewProduct({name:'',price:'',image:''});
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <Input
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            /*
            So onchange,tell here whenever there is change in the input field set to setNewProduct,inside this pass the hole newProduct variable and particularly the targeted on like this for name ,So e.target.value which store in the name field of input
            */
            onChange={(e)=> setNewProduct(
              {...newProduct,name:e.target.value}
            )}
            mb={5}
            mt={5}
          />         
           <Input
            placeholder="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={
              (e) =>{
                setNewProduct({...newProduct,price:e.target.value})
              }
            }
            mb={5}
          />          
          <Input
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={
              (e)=>{setNewProduct({
                ...newProduct,image:e.target.value
              })}
            }
            mb={5}
          />
          <Button colorScheme="blue" onClick={handleProduct}>Add Product</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
