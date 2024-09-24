import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/viewProduct.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import Product from "../models/product";

const urlBase = "http://localhost:3001/"


const ViewProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>();
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleRegisterProduct(navigate: ReturnType<typeof useNavigate>) {
        navigate('/registerProduct');
    }

    function handleEditProduct(navigate: ReturnType<typeof useNavigate>, id: number) {
        navigate(`/updateProduct?id=${id}`);
    }



      const handleDeleteProduct = async (product:Product) => {
        setLoading(true);
    
        try {
            const token = Cookies.get('token');
            console.log(token);
            const response = await axios.delete(`http://localhost:3001/deleteProduct?id=${product.id}`, { headers: { 'x-access-token': token } });
    
            if (response.data.type == "S") {
                alert("Produto deletado com sucesso!");
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            alert("Error: " + error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadProducts = async () => {
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:3001/selectAllProduct");
            if(response.data.type == "S"){
                setProducts(response.data.data);
            }else{
                alert("Error: " + response.data.message);
            }
        } catch (error){
            alert("Error: " + error);
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        if(Cookies.get('token') == undefined || Cookies.get('loggedUser') == undefined){ 
            handleLogout(navigate);
        }
        else{
            const userLoad: User = JSON.parse(Cookies.get('loggedUser')!!);
            console.log(userLoad);
            if(userLoad.adm == true){
            handleLoadProducts();
        } else{
            alert("Você não tem permissão para acessar essa página!");
            handleLogout(navigate);
        }
        }
    }, [navigate])

    return( 
        <>
        <Header />
        <Loading message="Logging in..." isLoading={loading} />
        <body style="flex-direction:column;">
            <div class="mainContentProduct">
                <button id="buttonCadProduct" onClick={() => handleRegisterProduct(navigate)}>Cadastrar produto novo</button>
                <div class="userModalProduct">
                    {products?.map((product) => (
                        <div class="divProduct" style="cursor:pointer;" onClick={()=>{handleEditProduct(navigate, product.id!!)}}>
                            
                            <img src={product.images.length > 0 ? urlBase+product.images[0].link : ""} alt="Imagem" />
                            <p class="nameProduct">{product.name}</p>
                            <span class="descImage">{product.description}</span>
                            <button class="buttonDelete" onClick={()=>handleDeleteProduct(product)}>Deletar</button>
                        </div>
                    ))}
                </div>
            </div>
        </body>
        <Footer/>
    </>
    );
  };
  
  export default ViewProduct;