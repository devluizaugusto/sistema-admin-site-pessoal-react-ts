import React, { useEffect, useState } from 'react';

import styles from "./Home.module.css";

import { FaGraduationCap, FaBriefcase, FaFolder } from "react-icons/fa";

import { Title } from '../../components/common/Title';
import { InfoBox } from '../../components/common/InfoBox';

import { Experiences, getExperiencesByType } from '../../services/ExperiencesServices';
import { Portfolio, getPortfolio } from '../../services/PortfolioServices';

const Home = () => {

    const [academicExperiences, setAcademicExperiences] = useState<Experiences[]>([]);
    const [professionalExperiences, setProfessionalExperiences] = useState<Experiences[]>([]);
    const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

    const fetchAcademicExperiences = async () => {
        try{
            const response = await getExperiencesByType("Acadêmica");
            setAcademicExperiences(response);
        }
        catch(error){
            console.log(error);
        }
    };

    const fetchProfessionalExperiences = async () => {
        try{
            const response = await getExperiencesByType("Profissional");
            setProfessionalExperiences(response);
        }
        catch(error){
            console.log(error);
        }
    };

    const fetchPortfolio = async () => {
        try{
            const response = await getPortfolio();
            setPortfolio(response);
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAcademicExperiences();
        fetchProfessionalExperiences();
        fetchPortfolio();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao Sistema Administrativo do Site Pessoal.</Title>
            <p>Este é o Dashboard onde você encontra algumas estatísticas de cadastros. Navegue pela barra lateral para acessar outras opções.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox
                    title="Experiências Acadêmicas"
                    value={academicExperiences.length}
                    icon={<FaGraduationCap size={65}/>}
                /> 
                <InfoBox
                    title="Experiências Profissionais"
                    value={professionalExperiences.length}
                    icon={<FaBriefcase/>}
                />
                <InfoBox
                    title="Projetos no Portfólio"
                    value={portfolio.length}
                    icon={<FaFolder/>}
                />    
            </div>
        </main>
    );
};

export default Home;