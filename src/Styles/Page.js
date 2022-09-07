import styled from 'styled-components';

const Page = styled.div`
width: 100%;
margin: ${props => props.page === 'Login' || props.page === 'SignUp' ? 'auto 0' : '80px 0'};
display: flex;
flex-direction: column;
align-items: center;

h1 {
        font-family: 'Saira Stencil One', cursive !important;
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        color: white;
        margin-bottom: 40px;
    }

a {
    color: white;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
}
`;

export default Page;