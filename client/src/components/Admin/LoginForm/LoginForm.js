import React, {useState} from 'react';
import {Form,Input,Button,notification} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {signInApi} from '../../../api/user';
import {ACCESS_TOKEN,REFRESH_TOKEN} from '../../../utils/constants';

import "./LoginForm.scss";

export default function LoginForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm =  e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };
    

    const login = async e => {
        
       const result = await signInApi(inputs);

       if(result.message) {
           notification["error"]({
               message: result.message
           });
       }else {
           const {accessToken,refreshToken} = result;
           localStorage.setItem(ACCESS_TOKEN, accessToken);
           localStorage.setItem(REFRESH_TOKEN, refreshToken);

           notification["success"]({
               message: "Login Correcto"
           });

           window.location.href = "/admin";
       }
    };

    return (
        <Form className="login-form" onFinish={login} onChange={changeForm} >
            <Form.Item>
                <Input
                    prefix={<UserOutlined />}
                    type= "email"
                    name= "email"
                    placeholder= "Correo Electronico"
                    className= "login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    )
}