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


const ViewCategorie = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Categorie[]>();
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleRegisterCategorie(navigate: ReturnType<typeof useNavigate>) {
        navigate('/registerCategorie');
    }

    function handleUpdateCategory(navigate: ReturnType<typeof useNavigate>, id?: number) {
        navigate(`/updateCategory?id=${id}`);
    }


      const handleDeleteCategorie = async (categorie:Categorie) => {
        setLoading(true);
    
        try {
            const token = Cookies.get('token');
            console.log(token);
            const response = await axios.delete(`http://localhost:3001/deleteCategory?id=${categorie.id}`, { headers: { 'x-access-token': token } });
    
            if (response.data.type == "S") {
                alert("Categoria deletada com sucesso!");
                handleLoadCategories();
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

    const handleLoadCategories = async () => {
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:3001/selectCategory");
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
    };


    useEffect(()=>{
        if(Cookies.get('token') == undefined || Cookies.get('loggedUser') == undefined){ 
            handleLogout(navigate);
        }
        else{
            const userLoad: User = JSON.parse(Cookies.get('loggedUser')!!);
            console.log(userLoad);
            if(userLoad.adm == true){
            handleLoadCategories();
            console.log(categories);
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
                <button id="buttonCadProduct" onClick={() => handleRegisterCategorie(navigate)}>Cadastrar categoria novo</button>
                <div class="userModalCategorie" >
                    {categories?.map((categorie) => (
                        <div class="categorieItem">
                            <div class="itemColumn">
                                <p>{categorie.name}</p>
                                <span>{categorie.description}</span>
                            </div>
                            <div class="itemColumn">
                                <p class="tinyP">5</p>
                                <span class="tinySpan">Produtos nessa categoria</span>
                            </div>
                            <div class="itemRow">
                                <button class="buttonEdit" type="button" onClick={()=>{handleUpdateCategory(navigate, categorie.id)}}>Editar</button>
                                <button class="buttonDelete" type="button" onClick={() => {handleDeleteCategorie(categorie)}}>Deletar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </body>
        <Footer/>
    </>
    );
  };
  
  export default ViewCategorie;