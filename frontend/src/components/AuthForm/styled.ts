import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
`;

export const Content = styled.div`
    width: 20%;
    height: 80%;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.div`
    color: var(--Black-500, #001d3d);
    font-family: 'Montserrat Alternates';
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const InputContainer = styled.div`
    color: var(--Black-500, #001d3d);
    width: 100%;
    text-align: center;
    font-family: Montserrat;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    display: flex;
    max-width: 100%;
    height: 30px;
    padding: 10px 10px 10px 16px;
    align-items: center;
    border-radius: 16px;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    background: var(--white-white-100, rgba(255, 255, 255, 0.4));
    outline: none;
    font-size: 18px;
`;

export const Button = styled.div`
    border-radius: 16px;
    cursor: pointer;
    background: var(--Gradient-Linear, linear-gradient(90deg, #2460bc 0%, #478efa 100%));
    width: 100%;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
`;

export const LogoContainer = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: center;
`;

export const RegistrationContainer = styled.div`
    color: var(--Black-500, #001d3d);
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const Registration = styled.div`
    color: var(--add-blue, #438af9);
    cursor: pointer;
`;
