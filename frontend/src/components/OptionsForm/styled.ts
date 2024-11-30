import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    height: 90%;
    width: 30%;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 44px;
`;

export const Avatar = styled.div`
    min-width: 50px;
    min-height: 50px;
    background-color: #ecebeb;
`;
