import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { useState, useEffect } from "react";
import Login from './Login';
import SignUp from './SignUp';
import New from './New';
import Menu from './Menu';
import Panel from './Panel';

import '../Styles/general-styles.css';
import '../Styles/reset.css';

export default function App() {
    return (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );
}

function Root() {
    const[user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('my-wallet'));
        
        if(local) {    
            setUser(local);
        } else {
            navigate("/");
        }   
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Menu />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<SignUp />} />
                <Route path='/painel' element={<Panel />} />
                <Route path='/novo/:type' element={<New />} />
            </Routes>

        </UserContext.Provider>
    );
}