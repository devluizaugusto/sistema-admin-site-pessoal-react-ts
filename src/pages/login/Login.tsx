import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/forms/Input';

import * as Yup from "yup";

import styles from './Login.module.css';
import { login as loginService } from '../../services/AuthServices';
import { useAuth } from '../../contexts/AuthContext';

import { Form } from '../../components/forms/Form';
import { Button } from '../../components/common/Button';
import { Title } from '../../components/common/Title';

interface LoginValues{
    email: string;
    password: string;
}

const initialValues: LoginValues = {
    email: "",
    password: "",
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
         .email("E-mail inválido")
         .required("E-mail é obrigatório!"),
    password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 carcteres!")
        .required("Senha é obrigatória"),        
});

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const onSubmit = async (values: LoginValues) => {
        try{
           const user = await loginService(values.email, values.password);
            login(user);
            navigate("/");
            console.log(values);
        }
        catch (error){
            console.log(error);
            alert("Erro ao realizar login!");
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched}) => (
                    <>
                        <Title>Área de acesso - Site Pessoal</Title>

                        <Input
                                label="Email"
                                name="email"
                                type="email"
                                errors={errors.email}
                                touched={touched.email}
                        />

                        <Input
                                label="Senha"
                                name="password"
                                type="password"
                                errors={errors.password}
                                touched={touched.password}
                        />
    
                        <Button type="submit" gray>Entrar</Button>
                    </>
                )}    
            </Form>
        </div>
    )
};

export default Login;