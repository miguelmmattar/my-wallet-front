import Page from '../Styles/Page'
import UserContext from "../Contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { postLogin } from '../Services/mywallet';
import styled from 'styled-components';

export default function Panel() {
    const { user } = useContext(UserContext);
    
    return (
        <Page page='Panel'>
            <Board>

            </Board>

            <Buttons>
                <Button type='add' />
                <Button type='remove' />
            </Buttons>
        </Page>
    );
}

function Transaction ({ date, description, value }) {
    return (
        <div>
            <span>
                <h6>{date}</h6>
                <p>{description}</p>
            </span>
            
            <h5>{value.toString().replace('.', ',')}</h5>
        </div>
    );
}

function Button ({ type }) {
    return (
        <div>
            {type === 'add' ? (
                <>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h4>Nova entrada</h4>
                </>
            ) : (
                <>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <h4>Nova saída</h4>
                </>
            )}    
        </div>
    );
}

const Board = styled.div`
    width: 100%;
    height: calc(100vh - 143px - 80px);
    background-color: white;
    border-radius: 5px;
    padding: 23px 12px 10px 12px;

    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    h6 {
        font-size: 16px;
        color: #C6C6C6;
        margin-right: 5px;
    }

    p {
        font-size: 16px;
        color: black;
    }

    h5 {
        font-size: 16px;
        color: ${props => props.type === 'in' ? '#03AC00' : '#C70000'};
    }
`;

const Buttons = styled.div`
    width: 100%;
    height: 114px;
    margin: 13px 0 16px 0;
    display: flex;
    justify-content: space-between;
    
    div {
        width: calc(50% - 7.5px);
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        background-color: #A328D6;
        cursor: pointer;
    }

    h4 {
        color: white;
        font-size: 17px;
        font-weight: 700;
        max-width: 65px;
    }
`;