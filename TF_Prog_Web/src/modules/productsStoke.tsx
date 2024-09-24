import "../app.css";

import "../styles/viewProduct.css";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Definição dos tipos dos produtos
interface Product {
  id: number;
  name: string;
  description: string;
  images: Array<any>;
}


const urlBase = "http://localhost:3001/"
const ProductModal = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleGetProductsWithouStock = async () =>{
    const token = Cookies.get('token');
      const response = await axios.get("http://localhost:3001/reportStock", {headers:{'x-access-token': token}});
      if(response.data.type == "S"){
          console.log(response);
          setProducts(response.data.data);
      }else{
          alert("Error: " + response.data.message);
      }
  }

  // Fazendo a requisição de produtos
  useEffect(() => {
    try{  
      handleGetProductsWithouStock();
    }catch(e){
      console.log(e);
    }
  }, []);

  // Função para editar o produto
  const handleEditProduct = (navigate: any, id: number) => {
    // Função de navegação - precisa ser definida conforme o router que você usa
    navigate(`/updateProduct?id=${id}`);
  };

  return (

    <>
    <div class="elementSpaceBetween mt-100">
            <h2 class="text-left">Produtos em Falta</h2>
    </div>   
    <div className="modalProduct">
      {
        products?.map((product) => (
          
      
        <div class="divProduct" style="cursor:pointer;" onClick={()=>{handleEditProduct(navigate, product.id!!)}}>
                            
                <img src={product.images.length > 0 ? urlBase+product.images[0].link : ""} alt="Imagem" />
                <p class="nameProduct">{product.name}</p>
                <span class="descImage">{product.description}</span>
            </div>
          
        ))
      }
    </div></>
  );
};

export default ProductModal;
