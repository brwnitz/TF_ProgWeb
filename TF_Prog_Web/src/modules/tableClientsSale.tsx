import React, { useEffect, useState } from "react";
import "../app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "./loading";


import Cookies from 'js-cookie';

interface Cliente {
  id: number;
  name: string;
  total_purchases: number;
}

const TabelaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [fetchClientes, setFetchClientes] = useState(false);

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    var element = event.currentTarget as HTMLInputElement;
    setEndDate(element.value);
  };

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    var element = event.currentTarget as HTMLInputElement;
    setStartDate(element.value);
  };

  const handleLoadClients = async () => {
        setLoading(true);
        try{

            const token = Cookies.get('token');
            const response = await axios.get('http://localhost:3001/reportSaleClient?init_date="'+startDate+'"&&final_date="'+endDate+'"',  {headers:{'x-access-token': token}});
            if(response.data.type == "S"){
                console.log(response);
                setClientes(response.data.data);
            }else{
                alert("Error: " + response.data.message);
            }
        } catch (error){
            alert("Error: " + error);
            console.error(error);
        }
        finally{
            setFetchClientes(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (fetchClientes) {
          handleLoadClients();
        }
      }, [fetchClientes, startDate, endDate]);

  // Ordenar clientes por valor de compras (do maior para o menor)
  const clientesOrdenados = [...clientes].sort(
    (a, b) => b.total_purchases - a.total_purchases
  );

  return (

    <>
        <div class="elementSpaceBetween mt-100">
            <h2 class="text-left">Clientes</h2>
            <div class="center">
                <div class="modalRowDates">
                    <input type="date" class="date-field mr-15" placeholder={"Data Inicial"} onChange={(event)=>{handleChangeStartDate(event)}}/>
                    <input type="date" class="date-field mr-15" placeholder={"Data final"} onChange={(event)=>{handleChangeEndDate(event)}} />
                    <button type="submit" class="search-button" onClick={(e: Event)=>{
                        e.preventDefault();
                        setFetchClientes(true);
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>    
        <div className="tabela-container">
        <Loading message="Carregando..." isLoading={loading} />
        <table className="tabela-clientes">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Total de Compras</th>
            </tr>
            </thead>
            <tbody>
            {clientesOrdenados.map((cliente) => (
                <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.name}</td>
                <td>{cliente.total_purchases}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
  );
};

export default TabelaClientes;