import React from 'react';
import "../app.css";

interface LoadingProps {
    message: string;
    isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message, isLoading }) => {
    if(!isLoading) return null;
    return (
        <div className="loading-dialog">
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    );
};

export default Loading;