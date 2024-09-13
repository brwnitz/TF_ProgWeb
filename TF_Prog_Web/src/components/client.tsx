import React, { useState } from 'react';
import "../app.css";
import Header from '../modules/header';
import Footer from '../modules/footer';

const ClientPage: React.FC = () => {
    const [data, setData] = useState<string>('Initial data');

    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((event.target as HTMLInputElement).value);
    };

    const handleLogout = () => {

    };

    return (
        <>
        <Header />
        <div>
            <h1>Client Page</h1>
            <input type="text" value={data} onChange={handleDataChange} />
            <button onClick={handleLogout}>Logout</button>
        </div>
        <Footer/>
        </>
    );
};

export default ClientPage;