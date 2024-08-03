import React, { useState } from 'react';
import "../app.css";

const ClientPage: React.FC = () => {
    const [data, setData] = useState<string>('Initial data');

    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((event.target as HTMLInputElement).value);
    };

    const handleLogout = () => {

    };

    return (
        <div>
            <h1>Client Page</h1>
            <input type="text" value={data} onChange={handleDataChange} />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ClientPage;