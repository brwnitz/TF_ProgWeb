import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/viewCategorie.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import Categorie from "../models/categorie";
import Product from "../models/product";


const ViewCart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    const handleLoadProducts = async () => {
        setLoading(true);
        try{
            const cart: Product[] = JSON.parse(Cookies.get('cart')!!);
            if(cart == null){
                setProducts([]);
            } else {
                setProducts(cart);
            }
        } catch (error){
            alert("Error: " + error);
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };

    const handleAddCart = (product: Product) => {
        const cart: Product[] = JSON.parse(Cookies.get('cart')!!);
        setProducts([...cart, product]);
        Cookies.set('cart', JSON.stringify(cart));
    }

    const handleRemoveCart = (product: Product) => {
        const cart: Product[] = JSON.parse(Cookies.get('cart')!!);
        const newCart = cart.filter((item) => item.id !== product.id);
        setProducts(newCart);
        Cookies.set('cart', JSON.stringify(newCart));
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
            console.log(products);
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
                <div class="userModalCategorie" >
                    {products?.map((product) => (
                        <div class="categorieItem">
                            <div class="itemColumn">
                                <p>{product.name}</p>
                                <span>{product.description}</span>
                            </div>
                            <div class="itemColumn">
                                <p class="tinyP">1</p>
                                <span class="tinySpan">Items</span>
                            </div>
                            <button type="button" class="buttonAddCart" onClick={()=>{handleRemoveCart(product)}}>Remover</button>
                            <button type="button" class="buttonAddCart" onClick={()=>{handleAddCart(product)}}>Adicionar mais</button>
                        </div>
                    ))}
                </div>
            </div>
        </body>
        <Footer/>
    </>
    );
  };
  
  export default ViewCart;