import React, { useEffect, useState } from "react";

// Definição dos tipos dos produtos
interface Product {
  id: number;
  name: string;
  description: string;
  images: { link: string }[];
}


const urlBase = "http://localhost:3001"
const ProductModal = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fazendo a requisição de produtos
  useEffect(() => {
    // Simulando uma requisição (substitua com sua API)
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  // Função para editar o produto
  const handleEditProduct = (navigate: any, productId: number) => {
    // Função de navegação - precisa ser definida conforme o router que você usa
    navigate(`/edit/${productId}`);
  };

  return (
    <div className="userModalProduct">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            className="divProduct"
            key={product.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleEditProduct(null, product.id)}
          >
            <img
              src={product.images.length > 0 ? `${urlBase}${product.images[0].link}` : ""}
              alt="Imagem do Produto"
              className="productImage"
            />
            <p className="nameProduct">{product.name}</p>
            <span className="descImage">{product.description}</span>
          </div>
        ))
      ) : (
        <p>Carregando produtos...</p>
      )}
    </div>
  );
};

export default ProductModal;
