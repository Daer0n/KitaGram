import styled from 'styled-components';

export const Container = styled.header`
    height: 160px;
    width: 100%;
    background: var(--Gradient-Linear, linear-gradient(90deg, #2460bc 0%, #478efa 100%));
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    height: 88px;
    border-radius: 8px;
    padding: 30px;
`;

export const Icon = styled.div`
    cursor: pointer;
`;

export const LogoContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;
