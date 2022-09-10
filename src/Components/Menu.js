import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import { deleteLogout } from '../Services/mywallet';

export default function Menu() {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    let title = '';

    if(path === '/novo/entrada') {
        title = 'Nova entrada';
    }

    if(path === '/novo/saida') {
        title = 'Nova saída';
    }

    if(path === '/painel') {
        title = `Olá, ${user.name}`;
    }

    function logout() {
        if(window.confirm('Tem certeza que deseja sair?')) {
            deleteLogout(user.token).then(() => navigate('/'));
        } else return;
    }

    return (
        <>
            {(path !== '/' && path !== '/cadastro') && (
                <MenuBar page={path}>
                    <h2>{title}</h2>
                    <span><ion-icon name="log-out-outline" onClick={logout}></ion-icon></span>
                </MenuBar>
            )}
        </>
    );
}

const MenuBar = styled.div`
    width: 100%;
    max-width: 800px;
    min-width: 300px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 25px;
    z-index: 1;
    
    h2 {
    width: 100%;
    font-size: 26px;
    font-weight: 700;
    color: white;
    text-align: left;
    }

    span {
        display: ${props => props.page === '/painel' ? 'initial' : 'none'};
    }
`;