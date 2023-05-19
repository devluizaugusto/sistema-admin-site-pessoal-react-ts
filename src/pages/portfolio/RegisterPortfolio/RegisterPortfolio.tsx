import React from "react";

import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";

import { Portfolio, createOrUpdatePortfolio } from "../../../services/PortfolioServices";

import { Input } from "../../../components/forms/Input";
import { Form } from "../../../components/forms/Form";
import { Title } from "../../../components/common/Title";
import { Button } from "../../../components/common/Button";

const RegisterPortfolio: React.FC = () => {

    const navigate = useNavigate();
    const portfolio = useLocation().state as Portfolio;

    const initialValues: Portfolio = {
        link: "",
        image: "",
        title: ""
    };
    
    const validationSchema = Yup.object().shape({
        link: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        title: Yup.string().required("Campo obrigatório"),
    });

    const onSubmit = async (values: Portfolio, { resetForm }: { resetForm: () => void }) => {
        try{
            await createOrUpdatePortfolio(values);
            resetForm();
            navigate("/portfolio/ListPortfolio");
            alert("Formulário enviado com sucesso!");
        }
        catch (error){
            console.log(error);
            alert("Ocorreu um erro ao enviar o formulário!")
        }
    }

    return (
        <Form
            initialValues={portfolio || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched}) => (
                <>
                    {
                        !portfolio ? <Title>Cadastro de Portfolio</Title>: <Title>Atualizar Portfólio</Title>
                    }
                        
                    <Input
                        label="link"
                        name="link"
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Input
                        label="Imagem"
                        name="image"
                        errors={errors.image}
                        touched={touched.image}
                    />  

                    <Input
                        label="Titulo"
                        name="title"
                        errors={errors.title}
                        touched={touched.title}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default RegisterPortfolio;