import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/dashboard.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import MetricsChart from "../modules/metrics";
import ProductModal from "../modules/productsStoke";
import TabelaClientes from "../modules/tableClientsSale";


const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }


    /*const handleInfo = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
        const concatenateAddress = target[6].value + ';' + target[7].value + ';' + target[8].value + ';' + target[9].value + ';' + target[10].value;

        const user: User = {
            name: target[0].value,
            surname: target[1].value,
            email: target[2].value,
            tell: target[3].value,
            password: target[4].value,
            adress: concatenateAddress,
            adm: false
        }

        try{
            const token = Cookies.get('token');
            const response = await axios.put("http://localhost:3001/updateUser", user, {headers:{'x-access-token': token}});

            if(response.data.type == "S"){
                alert("Usuário atualizado com sucesso!");
            }
            else{
                alert("Error: " + response.data.message);
            }
        }
        catch(error){
            alert("Error: " + error);
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    
      };


      const handleDelete = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = Cookies.get('token');
            console.log(token);
            const response = await axios.delete("http://localhost:3001/deleteUser", { headers: { 'x-access-token': token } });
    
            if (response.data.type == "S") {
                alert("Usuário deletado com sucesso!");
                handleLogout(navigate);
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            alert("Error: " + error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };*/

    /*const handleLoadMetrics = async () => {
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:3001/select");
            if(response.data.type == "S"){
                setCategories(response.data.data);
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
    };*/


    useEffect(()=>{
        if(Cookies.get('token') == undefined || Cookies.get('loggedUser') == undefined){ 
            handleLogout(navigate);
        }
        else{
            const userLoad: User = JSON.parse(Cookies.get('loggedUser')!!);
            console.log(userLoad);
            if(userLoad.adm == true){
                setUser(userLoad);
                
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
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <div class="containerDiv">
                <MetricsChart/>
                <ProductModal/>
                <TabelaClientes/>
            </div>
            
         </body>
         <Footer/>
    </>
    );
  };
  
  export default Dashboard;