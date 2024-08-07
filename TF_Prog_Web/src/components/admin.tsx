import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../app.css";
import "../styles/userinfo.css";
import Cookies from 'js-cookie';


const Admininfo = () => {
    const navigate = useNavigate();
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        navigate('/login');
    }
    
    
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            console.log(Cookies.get('loggedUser'));
            handleLogout(navigate);
        }
        const searchParams = new URLSearchParams(window.location.search);
        console.log(searchParams);
        const userId = searchParams.get('user');
        console.log(userId);
        if(userId != '1'){
            handleLogout(navigate)
        }
    }, [navigate])
    
    return( 
        <>
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <h1>Aqui ficará as informações de administrador</h1>
         </body>
    </>
    );
  };
  
  export default Admininfo;