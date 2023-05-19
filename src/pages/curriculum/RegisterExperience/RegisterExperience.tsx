import React from 'react';

import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { Input } from '../../../components/forms/Input';
import { TextArea } from '../../../components/forms/TextArea';
import { Select } from '../../../components/forms/Select';
import { Form } from '../../../components/forms/Form';
import { Button } from '../../../components/common/Button';
import { Title } from '../../../components/common/Title'; 

import { Experiences, createOrUpdateExperiences } from '../../../services/ExperiencesServices';

const RegisterExperience: React.FC = () => {

    const navigate = useNavigate();
    const experiences = useLocation().state as Experiences

    const initialValues: Experiences = {
        title: "",
        description: "",
        type: "",
        startYear: "",
        endYear: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Campo obrigatório!"),
        startYear: Yup.number().required("Campo obrigatório!").typeError("Um numero é obrigatório!"),
        endYear: Yup.number().required("Campo obrigatório!").typeError("Um numero é obrigatório!"),
        type: Yup.string().required("Campo obrigatório!"),
        description: Yup.string(),
    });

    const onSubmit = async (values: Experiences, { resetForm }: { resetForm: () => void }) => {
        try{
            await createOrUpdateExperiences(values);
            console.log(values);
            resetForm();
            navigate("/curriculum/Experience/List");
            alert("Formulário enviado com sucesso!");
        }
        catch (error){
            console.log(error);
            alert("Ocorreu um erro ao enviar o formulário!")
        }
    }

    return (
            <Form
                initialValues={experiences || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({errors, touched}) => (
                    <>
                        {
                            !experiences ? <Title>Cadastrar Experiência</Title>: <Title>Atualizar Experiência</Title>
                        }
                        <Input 
                            label='Titulo'
                            name='title'
                            errors={errors.title}
                            touched={touched.title}
                        />

                        <Input 
                            label='Ano de Início'
                            name='startYear'
                            errors={errors.startYear}
                            touched={touched.startYear}    
                        />

                        <Input 
                            label='Ano de Fim'
                            name='endYear'
                            errors={errors.endYear}
                            touched={touched.endYear}
                        />

                        <Select
                            label='Tipo de experiência'
                            name='type'
                            options={[
                                { value: "Profissional", label: "Profissional" },
                                { value: "Acadêmica", label: "Acadêmica" },
                            ]}
                            errors={errors.type}
                            touched={touched.type}
                        />

                        <TextArea 
                            label='Descrição'
                            name='description'
                            errors={errors.description}
                            touched={touched.description}
                        />

                        <Button type="submit" gray>Salvar</Button>
                        
                    </>
                )}
            </Form>
       
    )
}

export default RegisterExperience;