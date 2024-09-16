import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import Categorie from "../models/categorie";
import Product from "../models/product";
import Image from "../models/image";

const RegisterProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Categorie[]>();
    const [images, setImages] = useState<File[]>([]);


    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleSucces(navigate: ReturnType<typeof useNavigate>) {
        navigate('/viewProducts');
    }

    const handleRegisterProduct = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
        const product:Product = {
            name: target[0].value,
            description: target[1].value,
            category: target[2].value,
            price: target[3].value,
            stock: target[4].value,
            moreInfors: target[5].value,
            ingredients: "0",
        }

        try{
            const response = await axios.post("http://localhost:3001/registerProduct", product, { headers: { 'x-access-token': Cookies.get('token') } });
            
            if(response.data.type == "S"){
                const formData = new FormData();
                images.forEach((image, index)=>{
                    formData.append(`image_${index}`, image);
                })
                formData.append("id_packedLunch", response.data.id);
                const responseImage = await axios.post("http://localhost:3001/registerImageProduct", formData, { headers: { 'x-access-token': Cookies.get('token'), 'Content-Type':'multipart/form-data' } });
                if(responseImage.data.type == "S"){
                    alert("Produto cadastrado com sucesso!");
                    handleSucces(navigate);
                }
                else{
                    alert("Error: " + responseImage.data.message);
                }
                alert("Produto cadastrado com sucesso!");
                handleSucces(navigate);
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
    }

    const handleImageUpload = (e: any) => {
        const files:File[] = e.target.files
        if (files) {
            setImages(prevImages => [...prevImages, ...Array.from(files)]);
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
                console.log("entrou adm");
                handleLoadCategories();
            } else{
                alert("Você não tem permissão para acessar essa página!");
                handleLogout(navigate);
            }
        }
    }, [navigate])
  return (
    <>
    <Header />
        <Loading message="Carregando..." isLoading={loading} />
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <div class="userModal">
                <form onSubmit={handleRegisterProduct}>
                    <h1>Informações gerais</h1>
                    <div class="modalDivision">
                        <div class="modalRow">
                            <input type="text" placeholder="Nome do produto" required/>
                            <input type="text" placeholder="Descrição do produto" required/>
                        </div>
                        <div class="modalRow">
                            <select name="selectCategorie" id="selectCategorie">
                                <option value="placeholder">Selecione uma opção</option>
                                {categories?.map((categorie) => (
                                    <option value={categorie.id}>{categorie.name}</option>
                                ))}
                            </select>
                            <input type="number" placeholder="Valor (R$)" required/>
                        </div>
                        <div class="modalRow">
                            <input type="number" placeholder="Quantidade em estoque"/>
                            <input type="text" placeholder="Mais informações"/>
                        </div>
                    </div>
                    <div class="modalImage">
                        <div class="modalRow imageRow">
                            <div class="images">
                                {images?.map((image,index) => (
                                    <img key={index} src={URL.createObjectURL(image)} alt="Imagem" class="imageProduct"/>
                                ))}
                            </div>
                            <label for="addImage" class="labelImage"><p>+</p>Adicionar imagem</label>
                            <input type="file" id="addImage" accept="image/*" name="addImage" style="display:none" onChange={handleImageUpload}/>
                        </div>
                    </div>
                    <div class="modalRow">
                        <button type="submit">Salvar informações</button>
                    </div>
                </form>
            </div>
         </body>
         <Footer/>
    </>
  );
};

export default RegisterProduct;