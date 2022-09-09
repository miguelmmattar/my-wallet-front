import Form from '../Styles/Form';
import Page from '../Styles/Page';
import UserContext from "../Contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../Services/mywallet';

export default function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    function handleForm({ name, value }) {
        setForm({...form, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();

        const body = {
            email: form.email,
            password: form.password
        }

        const promise = postLogin(body)

        promise.then(answer => {
            setUser({
                name: answer.data.name,
                token: answer.data.token
            });

            localStorage.setItem('my-wallet', JSON.stringify({
                name: answer.data.name,
                token: answer.data.token
            }));

            navigate('/painel');
        });

        promise.catch(answer => {
            alert('Usuário ou senha inválidos!')
        });
    }

    return (
        <Page page='Login'>   
            <h1>MyWallet</h1>
            
            <Form onSubmit={handleSubmit}>
                <input 
                    type='email'
                    placeholder='E-mail'
                    name='email'
                    required
                    value={form.email}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })}
                />

                <input 
                    type='password'
                    placeholder='Senha'
                    name='password'
                    required
                    value={form.password}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })}
                />  

                <input 
                    type='submit'
                    value='Entrar'
                />        
            </Form>

            <Link to='/cadastro' style={{ textDecoration: 'none' }}>Primeira vez? Cadastre-se!</Link> 
        </Page> 
    );
}