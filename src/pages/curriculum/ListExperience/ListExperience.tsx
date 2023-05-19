import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Experiences, deleteExperiences, getExperiences } from '../../../services/ExperiencesServices';
import { Column, Table } from '../../../components/common/Table';

const ListExperience: React.FC = () => {

    const navigate = useNavigate();
    const [experiences, setExperience] = React.useState<Experiences[]>([]);

    const fatchExperiences = async () => {
        try{
            const experiences = await getExperiences();
            setExperience(experiences);
        }
        catch (error){
            console.log('Erro ao buscar experiências!', error);
        }
    };

    useEffect(() => {
        fatchExperiences();
    }, []);

    const handleEdit = (experience: Experiences) => {
       navigate("/curriculum/Experience/Register", { state: experience});
    };
    
    const handleDelete = async (experience: Experiences) => {
         try{
            await deleteExperiences(experience.id);
            fatchExperiences();
            alert('Experiência deletada com sucesso!');
         }
         catch (error){
            console.log('Erro ao deletar experiência!', error);
            alert('Ocorreu um erro ao deletar experiência, tente novamente!');
         }
    };

    const columns: Column<Experiences>[] = [
        { header: "Título", accessor: "title" },
        { header: "Descrição", accessor: "description" },
        { header: "Tipo", accessor: "type" },
        { header: "Ano de Início", accessor: "startYear" },
        { header: "Ano de Fim", accessor: "endYear" },
    ];

    return (
        <Table
            columns={columns}
            data={experiences}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ListExperience;