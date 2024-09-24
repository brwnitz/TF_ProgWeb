import React, { useEffect, useState } from 'react';
import "../app.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loading from './loading';
import axios from 'axios';

// Dados para o gráfico



const MetricsChart = () => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueTotal, setValueTotal] = useState(0.0);
  const [dataMetrics, setDataMetrics] = useState<[]>([]);


  const handleLoadMetrics = async (e: Event) => {
        e.preventDefault();
        const target: any = e.target;
        setLoading(true);
        setStartDate(target[0].value);
        setEndDate(target[1].value);
        try{
            const response = await axios.get("http://localhost:3001/reportSalesValueTotal?init_date="+startDate+"&&final_date="+endDate);
            if(response.data.type == "S"){
                var valueTotal = 0.0;
                if(response.data.data.length > 0){
                    for(var i = 0; i < response.data.data.length; i++){
                        valueTotal += response.data.data[i].total_value_received;
                    }
                }
                setValueTotal(valueTotal);
                setDataMetrics(response.data.data);
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

  

  return (
    <>
        <div class="elementSpaceBetween mt-100">
            <h2 class="text-left">Métricas</h2>
            <div class="center">
                <div class="modalRowDates">
                    <input type="date" class="date-field mr-15" placeholder={"Data Inicial"} />
                    <input type="date" class="date-field mr-15" placeholder={"Data final"} />
                    <button type="submit" class="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>
        <div class="mainContainer">
        <Loading message="Logging in..." isLoading={loading} />
            <div class="elementSpaceBetween">
                <h2 class="text-left">{dataMetrics.length > 0 ? startDate + " - ": "" }  {dataMetrics.length > 0 ? endDate: ""}</h2>
                <div class="elementColumn">
                    <h1 class="text-right no-margin">{dataMetrics.length > 0 ? valueTotal: ""}</h1>
                    <div class="custom-line mt-5"></div>
                    <h3 class="text-right mt-5">{dataMetrics.length > 0 ? "Total": ""}</h3>
                </div>
            </div>
            <div class="containerMetrics">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={1400}
                    height={300}
                    data={dataMetrics}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                    >
                    
                    <XAxis dataKey="name" />
                    <YAxis />
                    {dataMetrics.length > 0 ? <Tooltip /> : <></>}
                    <Legend />
                    {dataMetrics.length > 0 ? <Bar dataKey="value" fill="#ff0084" barSize={30} /> : <></>}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    </>
  );
}

export default MetricsChart;