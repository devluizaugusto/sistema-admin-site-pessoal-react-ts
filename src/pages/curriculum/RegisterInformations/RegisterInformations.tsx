import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';

import { Informations, getInformations, deleteInformations, createOrUpdateInformations } from '../../../services/InformationsServices';
import { InformationsCard } from './InformationsCard';

import { Input } from '../../../components/forms/Input';
import { TextArea } from '../../../components/forms/TextArea';
import { Button } from '../../../components/common/Button';
import { Title } from '../../../components/common/Title';
import { Form } from '../../../components/forms/Form';

import styles from './RegisterInformations.module.css';

const RegisterInformations: React.FC = () => {

    const [informations, setInformations] = useState<Informations>();

    const initialValues: Informations = {
        photo: '',
        name: '',
        office: '',
        summary: ''
    }

    const validationSchema = Yup.object().shape({
        photo: Yup.string().required('Campo obrigatório'),
        name: Yup.string().required('Campo obrigatório'),
        office: Yup.string().required('Campo obrigatório'),
        summary: Yup.string().required('Campo obrigatório'),
    });

    const fatchInformation = async () => {
        try{
            const information = await getInformations();
            setInformations(information);
        } 
        catch (error){
            console.error('Erro ao buscar informações!', error);
        }
    };

    useEffect(() => {
        fatchInformation();
    }, []);

    const onSubmit = async (values: Informations) => {
        try{
            await createOrUpdateInformations(values);
            setInformations(values);
            alert('Formulário enviado com sucesso!');
        } 
        catch (error){
            console.error('Erro ao enviar o formulário!', error);
            alert('Ocorreu um erro ao enviar o formulário, tente novamente!');
        }
    };

    const handleDelete = async () => {
        try{
            await deleteInformations();
            setInformations(undefined);
            alert('Informações deletadas com sucesso!');
        }
        catch (error){
            console.error('Erro ao deletar informações!', error);
            alert('Ocorreu em erro ao deletar as informações!, tente novamente!');
        }
    };

    return (
        <div className={styles.container}>
            <Form 
                initialValues={informations || initialValues} 
                enableReinitialize={true}
                validationSchema={validationSchema} 
                onSubmit={onSubmit}>
               
               {({errors, touched}) => (
                    
                    <>
                        <Title>Cadastro de Informações Pessoais</Title>

                        <Input
                            label="Foto"
                            name="photo"
                            errors={errors.photo}
                            touched={touched.photo}
                        />

                        <Input
                            label="Nome"
                            name="name"
                            errors={errors.name}
                            touched={touched.name}
                        />

                        <Input
                            label="Cargo"
                            name="office"
                            errors={errors.office}
                            touched={touched.office}
                        />

                        <TextArea
                            label="Resumo"
                            name="summary"
                            errors={errors.summary}
                            touched={touched.summary}
                        />

                        <Button type="submit" gray>Salvar</Button>

                        </>
                )}
            </Form>
            {informations &&
                Object.entries(informations).some(
                    ([key, value]) => key !== "id" && value.trim() !== ""
                ) && (
                    <div className={styles.cardContainer}>
                        <InformationsCard informations={informations} />
                        <Button onClick={handleDelete} gray>Deletar</Button>
                    </div>
                )}
        </div>
    );
};

export default RegisterInformations;