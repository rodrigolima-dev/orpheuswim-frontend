import React from 'react';
import './PrivateLayout.css'; 
import { Link } from 'react-router-dom';

const PrivateLayout = ({ children }) => {
  return (
    <div className='private-layout'>
        <div className='lateral-nav'>

            <img src="/images/logo-white.png" alt="logo" />


            <nav>
                <ul>
                    <li><Link to="/admin">Listar produtos</Link></li>
                    <li><Link to="/register">Cadastrar produto</Link></li>
                    <li><Link to="/logout">LogOut</Link></li>
                </ul>
            </nav>
        </div>

        <div className='content'>
            {children}
        </div>
    </div>
  );
};

export default PrivateLayout;