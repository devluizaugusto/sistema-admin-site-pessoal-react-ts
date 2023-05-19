import React from "react";

import { Home } from "../pages/home";
import { RegisterInformations } from "../pages/curriculum/RegisterInformations";
import { RegisterExperience } from "../pages/curriculum/RegisterExperience";
import { ListExperience } from "../pages/curriculum/ListExperience";
import { RegisterPortfolio } from "../pages/portfolio/RegisterPortfolio";
import { ListPortfolio } from "../pages/portfolio/ListPortfolio";

import { Layout } from "../components/layout";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const AuthRoutes: React.FC = () => {

    const { authenticated, isLoading } = useAuth();

    if(isLoading){
        return <p>Cerregando...</p>
    }

    if(!authenticated){
        return <Navigate to="/login" />
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/curriculum/Informations/Register" element={<RegisterInformations />} />
                <Route path="/curriculum/Experience/Register" element={<RegisterExperience />} />
                <Route path="/curriculum/Experience/List" element={<ListExperience />} />
                <Route path="/portfolio/RegisterPortfolio" element={<RegisterPortfolio />} />
                <Route path="/portfolio/ListPortfolio" element={<ListPortfolio />} />
            </Routes>
        </Layout>
    );
};

export default AuthRoutes;