import Form from '../Styles/Form';
import Page from '../Styles/Page';
import UserContext from "../Contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { postNew } from '../Services/mywallet';

export default function New() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { type } = useParams();
    const [form, setForm] = useState({
        value: "",
        description: ""
    });

    function handleForm({ name, value }) {
        setForm({...form, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();

        const body = {
            value: Number(form.value).toFixed(2),
            description: form.description,
            type: type
        }

        const token = user.token;
        const promise = postNew(body, token);

        promise.then(answer => {
                navigate('/painel');
        }); 

        promise.catch(answer => {
                alert('Digite informações válidas!');
        });
    }

    return (
        <Page page='New'>  
            <Form onSubmit={handleSubmit}>
                <input 
                    type='number'
                    placeholder='Valor'
                    name='value'
                    step='.01'
                    required
                    value={form.value}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })}
                />

                <input 
                    type='text'
                    placeholder='Descrição'
                    name='description'
                    required
                    value={form.description}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })}
                />  

                <input 
                    type='submit'
                    value={`Salvar ${type.replace('i', 'í')}`}
                />        
            </Form>
        </Page> 
    );
}