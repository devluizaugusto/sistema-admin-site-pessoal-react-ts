import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../common/Button';

const Sidebar: React.FC = () => {

    const { logout } = useAuth();

    return (
       <div className={styles.sidebar}>
            <nav className={styles.navigation}>
                
                <ul>
                    <li>
                        <NavLink to="/">
                            <h3>Home</h3>
                        </NavLink>
                    </li>
                </ul>
                
                <h3>Currículo</h3>
                
                <ul>
                    <li>
                        <NavLink to="/curriculum/Informations/Register">
                            Cadastrar Informações
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculum/Experience/Register">
                            Cadastrar Experiências
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculum/Experience/List">
                            Listar Experiências
                        </NavLink>
                    </li>
                </ul>
                
                <h3>Portfólio</h3>
                
                <ul>
                    <li>
                        <NavLink to="/portfolio/RegisterPortfolio">
                            Cadastrar Portfólio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio/ListPortfolio">
                            Listar Portfólios
                        </NavLink>
                    </li>
                </ul>

                <ul>
                    <li>
                        <NavLink to="/login">
                            <button onClick={logout} className={styles.logoutButton}>Sair</button>
                        </NavLink>
                    </li>
                </ul>
           
            </nav>
       </div>
    )
}

export default Sidebar;