import React, {  useEffect } from "react";

import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from '../components/ProductCard'

const HomePage = () => {

  const {fetchProducts,products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  // Debugging logs
  console.log("products: ", products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.500, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {/* {Mapping through products} */}
          {
            products.map((product) =>(
              <ProductCard 
              key ={product._id}
              product={product}
              />
            ))
          }
        </SimpleGrid>
        {products.length === 0 && (
          <Text
          fontSize="xl"
          textAlign={"center"}
          fontWeight={"semibold"}
          color="gray.500"
        >
          No products found
          <Link to={"/create"}>
            <Text
              //as tell which element to render
              as={"span"}
              //text decoration(color)
              color={"blue.500"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              Create product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
