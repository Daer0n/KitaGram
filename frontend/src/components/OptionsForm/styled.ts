import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    margin: 50px 0px;
    height: 90%;
    width: 30%;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 30px;
`;

export const Info = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 44px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.408px;
`;

export const Avatar = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ecebeb;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 80%;
`;

export const Description = styled.div`
    color: rgba(0, 0, 0, 0.75);
    text-align: center;
    font-family: Montserrat;
    font-size: 23px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.592px;
    text-transform: uppercase;
    margin-bottom: 10px;
`;

export const SectionElement = styled.div`
    background-color: #ecebeb;
    min-width: 100%;
    font-size: 23px;
    display: flex;
    justify-content: space-between;
    padding: 10px 40px 10px 10px;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    cursor: pointer;
`;

export const Button = styled.button`
    border-radius: 10px;
    outline: none;
    border: none;
    width: 60%;
    padding: 14px;
    color: #e16162;
    font-size: 23px;
    background-color: #ecebeb;
    cursor: pointer;
`;
