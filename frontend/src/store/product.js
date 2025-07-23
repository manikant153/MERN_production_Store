import { create } from "zustand";

/*
here we are creating a global state ,which can be access any component

products[
    product1{},  
    product1{} , 
    product1{}  etc.
        ] ,this store all the product
 what are the products:{name,price,imageURL}
*/
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    //if any fields was not filled then
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please fill all the fields",
      };
    }
    /*
        if all the fields are filled then,
        As we know that fetch is used to get the data from different source ,it might be any url or link or api link or your localhost machine 
        but currently we are working with localhost machine,so we need to fetch the data form our local machine
        basically we need to wite a
        fetch('http://localhost:5000/api/products')

        but it's too long api link 
        what we can do here is that shorten the fetch api by prefix
        like:- go to viteconfig set the proxy server to localhost:5000,
        eg:-
        {
        plugins:[react()],
        server:{
        proxy:{
        '/api':{
           target:'http://localhost:5000
           }
         }
        }
        }
        
        then you fetch method will look like this
        fetch(/api/products)


        now after settting the fetch link ,we have tell what kind of the link is,it's header part and what kind of data it will be passing ,all the stuff like:- 
                   setting up the header part
                   method : POST
                   body:JSON.stringify()
                 
        */
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //converting the body to JSON format(key and value)
      body: JSON.stringify(newProduct),
    });

    //after this response
    const data = await res.json();

    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product create successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Fetch response:", data);

    if (!data.success) return { success: false, message: data.message };
    //if delete item found then make use of filter method to remove the item from the product array,because we are not using the backend to remove the item from the product array ,it will automatically remove the item form the backend
    //Now as we are using the zustand store to manage the state of the product array,we can use to filter the product array to remove the item from the product array

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    // if update item found then make use of map mehtod to update the item in the product array
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return {
      success: true,
      message: "Product updated successfully",
      data: data.data,
    };
  },
}));
