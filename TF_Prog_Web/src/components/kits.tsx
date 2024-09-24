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


const ViewKits = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>();
    const [cart, setCart] = useState<Product[]>([]);
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleRegisterProduct(navigate: ReturnType<typeof useNavigate>) {
        navigate('/registerProduct');
    }

    const handleAddCart = (product: Product) => {
        setCart([...cart, product]);
        Cookies.set('cart', JSON.stringify(cart));
        console.log(JSON.stringify(cart));
    }

    const handleRemoveCart = (product: Product) => {
        const newCart = cart.filter((item) => item.id !== product.id);
        setCart(newCart);
        Cookies.set('cart', JSON.stringify(newCart));
    }

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
            if(userLoad.adm == false){
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
                        <div class="divProduct" style="cursor:pointer;">
                            
                            <img src={product.images.length > 0 ? urlBase+product.images[0].link : ""} alt="Imagem" />
                            <p class="nameProduct">{product.name}</p>
                            <div class="rowButtons">
                                <button type="button" onClick={() => handleAddCart(product)}>Adicionar</button>
                                <button type="button" onClick={() => handleRemoveCart(product)}>Remover</button>
                            </div>
                            <span class="descImage">{product.description}</span>
                    
                        </div>
                    ))}
                </div>
            </div>
        </body>
        <Footer/>
    </>
    );
  };
  
  export default ViewKits;