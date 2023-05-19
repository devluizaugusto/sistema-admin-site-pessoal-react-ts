import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ListPortfolio.module.css';
import { Portfolio, deletePortfolio, getPortfolio } from '../../../services/PortfolioServices';
import { Column, Table } from '../../../components/common/Table';
import { Experiences } from '../../../services/ExperiencesServices';

const ListPortfolio: React.FC = () => {
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

    const fatchPortfolio = async () => {
        try{
            const portfolio = await getPortfolio();
            setPortfolio(portfolio);
        }
        catch (error){
            console.log('Erro ao buscar portfolio!', error);
        }
    };

    useEffect(() => {
        fatchPortfolio();
    }, []);

    const handleEdit = (portfolio: Portfolio) => {
       navigate("/portfolio/RegisterPortfolio", { state: portfolio});
    };
    
    const handleDelete = async (portfolio: Portfolio) => {
         try{
            await deletePortfolio(portfolio.id);
            fatchPortfolio();
            alert('Portfolio deletado com sucesso!');
         }
         catch (error){
            console.log('Erro ao deletar portfolio!', error);
            alert('Ocorreu um erro ao deletar portfolio, tente novamente!');
         }
    };

    const columns: Column<Portfolio>[] = [
        { header: "Título", accessor: "title"},
        { header: "Imagem", accessor: "image"},
        { header: "Link", accessor: "link"},
    ]

    return (
       <Table 
            columns={columns}
            data={portfolio}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
       />
    );
};

export default ListPortfolio;