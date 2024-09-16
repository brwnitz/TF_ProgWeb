import { useNavigate } from "react-router-dom";
import "../app.css";
import "../styles/home.css";
import { useEffect, useState } from "preact/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faSignOut, faSignIn, faBars } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';


function handleNavigationLogin(navigator: ReturnType<typeof useNavigate>) {
    navigator('/login');
}

function handleNavigationMain(navigator: ReturnType<typeof useNavigate>) {
    navigator('/');
}

function handleSeeProduct(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewProducts');
}

function handleSeeCategorie(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewCategories');
}

function handleLogout(navigate: ReturnType<typeof useNavigate>) {
    Cookies.remove('loggedUser');
    Cookies.remove('token');
    navigate('/login');
}

const Header = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<boolean>(false);
    const [admin, setAdmin] = useState<boolean>(false);
    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        const loggedUser = Cookies.get('loggedUser');
        if(loggedUser != undefined){
            const user = JSON.parse(loggedUser);
            setLogged(true);
            if(user.adm){
                setAdmin(true);
            }
        }
    })

    return (
    <>
        <header>
            <div class="contactHeader">
                <span>
                    marmitexplus@gmail.com
                </span>
                <span>
                    (85) 9 9999-9999
                </span>
            </div>
            <div class="navHeader">
                <div class="navFirst">
                    {admin && (
                        <button type="button" id="btnLateral" style="margin-left:15px; background: transparent; color: var(--main-blue)" onClick={()=>{
                            if(menu == false){
                            document.getElementsByClassName("navButtons")[0].setAttribute("style", "left:-150px");
                            setMenu(true);
                            }
                            else{
                            document.getElementsByClassName("navButtons")[0].setAttribute("style", "left:0px");
                            setMenu(false);
                            }
                        }}><FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon></button>
                    )}
                    <h1>Marmitex+</h1>
                    <a onClick={()=>{handleNavigationMain}}>Página inicial</a>
                    <a >Kits</a>
                    <a >Menus</a>
                    <a >Ajuda</a>
                </div>
                <div class="navSearch">
                    <input type="text" />
                    <button type="button" id="btnSearch">Buscar</button>
                </div>
                <div class="navThird" style="margin-right:15px">
                    {
                        logged ? <a onClick={()=> handleLogout(navigate)}><FontAwesomeIcon icon={faSignOut} size="2x"></FontAwesomeIcon></a> : <a onClick={()=> handleNavigationLogin(navigate)}><FontAwesomeIcon icon={faSignIn} size="2x"></FontAwesomeIcon></a>
                    }
                    {
                        !admin && logged ? <a onClick={()=> handleNavigationMain(navigate)}><FontAwesomeIcon icon={faCartShopping} size="2x"></FontAwesomeIcon></a> : null
                    }
                </div>
            </div>
        </header>
        {admin && (
            <div class="navButtons">
                <div id="buttonSeeProduct" onClick={() => handleSeeProduct(navigate)}><i></i><span>Ver produtos</span></div>
                <div id="buttonSeeCateogires" onClick={() => handleSeeCategorie(navigate)}><i></i><span>Ver categorias</span></div>
            </div>
        )}
    </>
    )
  };
  
  export default Header;