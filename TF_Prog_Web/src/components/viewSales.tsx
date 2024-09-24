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
import Sale from "../models/sale";

const urlBase = "http://localhost:3001/"


const ViewSales = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sales, setSales] = useState<Sale[]>();
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleRegisterProduct(navigate: ReturnType<typeof useNavigate>) {
        navigate('/registerProduct');
    }


    const handleLoadProducts = async () => {
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:3001/selectAllSalesUser");
            if(response.data.type == "S"){
                setSales(response.data.data);
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
                <div class="userModalProduct">
                    {sales?.map((sale) => (
                        <div class="divProduct">
                            
                            <p class="nameProduct">{sale.codeSale}</p>
                            <span class="descImage">{sale.valueTotal}</span>
                
                        </div>
                    ))}
                </div>
            </div>
        </body>
        <Footer/>
    </>
    );
  };
  
  export default ViewSales;