import Page from '../Styles/Page'
import UserContext from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getPanel } from '../Services/mywallet';
import styled from 'styled-components';

export default function Panel() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState({});

    useEffect(() => {
        const promise = getPanel(user.token);

        promise.then(answer => {
            let sum = 0;

        answer.data.forEach(item => {
            if(item.type === 'entrada') {
                sum += Number(item.value);
            } else {
                sum -= Number(item.value);
            }
        });

        setTransactions(answer.data);
        
        setBalance({
            value: sum.toFixed(2),
            type: sum >= 0 ? 'entrada' : 'saida'
        });
    });

        promise.catch(answer => {
            alert('Você não está logado!');
            navigate('/');
        });
    }, []);
    
    return (
        <Page page='Panel'>
            <Board>
                {transactions.length > 0 ? (
                    <>
                        <List transactions={transactions} />
                        <Balance>
                            <h5>SALDO</h5>
                            <Value type={balance.type}>{balance.value}</Value>
                        </Balance>
                    </>    
                ) : (
                    <span><h3>Não há registros de entrada ou saída</h3></span>
                )}   
            </Board>

            <Buttons>
                <Link to='/novo/entrada'><Button type='add' /></Link>
                <Link to='/novo/saida'><Button type='remove' /></Link>
            </Buttons>
        </Page>
    );
}

function Transaction ({ date, description, value, type }) {
    return (
        <div>
            <span>
                <h6>{date}</h6>
                <p>{description}</p>
            </span>
            
            <span>  
                <Value type={type}>{value.toString().replace('.', ',')}</Value>
                <button>x</button>
            </span>  
        </div>
    );
}

function List({ transactions }) {
    return (
        <>
            {transactions.map((transaction, index) => (
                <Transaction 
                    key={index}
                    date={transaction.date}
                    description={transaction.description}
                    value={transaction.value}
                    type={transaction.type}
                />
            ))}
        </>  
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
    min-height: 200px;
    background-color: white;
    border-radius: 5px;
    padding: 23px 12px 10px 12px;
    position: relative;

    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    h6 {
        font-size: 16px;
        color: #C6C6C6;
        margin-right: 10px;
    }

    h3 {
        font-size: 20px;
        color: #868686;
        margin: auto;
        max-width: 180px;
        text-align: center;
        line-height: 24px;
    }

    p {
        font-size: 16px;
        color: black;
    }

    span {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: baseline;
        align-items: center;
    }

    span:last-child {
        justify-content: flex-end;
    }

    button {
        background-color: white;
        border: none;
        color: #C6C6C6;
        font-size: 16px;
        margin-left: 10px;
        padding: 0;
        cursor: pointer;
    }
`;

const Value = styled.h5`
    font-size: 16px;
    color: ${props => props.type === 'entrada' ? '#03AC00' : '#C70000'};
`;

const Balance = styled.div`
    width: calc(100% - 30px) !important;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 10px 15px !important;

    h5 {
        font-size: 17px;
        font-weight: 700;
    }
`;

const Buttons = styled.div`
    width: 100%;
    height: 114px;
    margin: 13px 0 16px 0;
    display: flex;
    justify-content: space-between;
    
    div, a {
        width: calc(50% - 7.5px);
        height: 114px;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        background-color: #A328D6;
        cursor: pointer;
        text-align: left;
    }

    a {
        text-decoration: none;
        padding: 0;
    }

    h4 {
        color: white;
        font-size: 17px;
        font-weight: 700;
        max-width: 65px;
    }
`;