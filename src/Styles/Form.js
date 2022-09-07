import styled from 'styled-components';

const Form = styled.form`
    width: 100%;
    margin-bottom: 36px;

    input {
        width: 100%;
        border-radius: 5px;
        border: none;
        padding: 0 15px;
    }

    input[type='email'],
    input[type='password'],
    input[type='text'],
    input[type='number'] {
        height: 58px;
        margin-bottom: 13px;
        font-size: 20px;
    }

    input[type='submit'] {
        height: 46px;
        background-color: #A328D6;
        color: white;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
    }

    input::placeholder {
        color: black;
        font-size: 20px;
    }
`;

export default Form;