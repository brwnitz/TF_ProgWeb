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

function handleNavigationUser(navigator: ReturnType<typeof useNavigate>) {
    navigator('/userInfo');
}



function handleSeeProduct(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewProducts');
}

function handleDashboard(navigate: ReturnType<typeof useNavigate>) {
    navigate('/dashboard');
}

function handleUserInfors(navigate: ReturnType<typeof useNavigate>) {
    navigate('/admin');
}

function handleSeeCategorie(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewCategories');
}

function handleLogout(navigate: ReturnType<typeof useNavigate>) {
    Cookies.remove('loggedUser');
    Cookies.remove('token');
    navigate('/login');
}

function handleSeeKits(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewKits');
}

function handleNavigationCart(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewCart');
}

function handleNavigationSales(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewSales');
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
                    {(
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
                    <a onClick={()=>{
                        if(!admin){
                            handleNavigationUser(navigate)
                        }else{
                            handleUserInfors(navigate)
                        }
                    }}>Página inicial</a>
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
                        !admin && logged ? <a onClick={()=> handleNavigationCart(navigate)}><FontAwesomeIcon icon={faCartShopping} size="2x"></FontAwesomeIcon></a> : null
                    }
                </div>
            </div>
        </header>
        {admin && (
            <div class="navButtons">
                <div id="buttonDashboard" onClick={() => handleDashboard(navigate)}><i></i><span>Dashboard</span></div>
                <div id="buttonSeeProduct" onClick={() => handleSeeProduct(navigate)}><i></i><span>Ver produtos</span></div>
                <div id="buttonSeeCateogires" onClick={() => handleSeeCategorie(navigate)}><i></i><span>Ver categorias</span></div>
                <div id="buttonSeeInfors" onClick={() => handleUserInfors(navigate)}><i></i><span>Conta</span></div>

            </div>
        )}
        {
            !admin && (
                <div class="navButtons">
                    <div id="buttonSeeKits" onClick={()=> handleSeeKits(navigate)}><i></i><span>Ver produtos</span></div>
                    <div id="buttonSeeSales" onClick={()=> handleNavigationSales(navigate)}><i></i><span>Ver histórico</span></div>
                </div>
            )
        }
    </>
    )
  };
  
  export default Header;