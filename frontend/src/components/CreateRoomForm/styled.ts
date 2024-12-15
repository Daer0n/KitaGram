import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    padding: 100px;
    margin: 100px;
    width: 50%;
    min-height: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    position: relative;
`;

export const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 65px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.408px;
    margin-top: 50px;
`;

export const Description = styled.div`
    color: #000;
    font-family: Montserrat;
    font-size: 35px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const Block = styled.div`
    display: flex;
    gap: 30px;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input`
    width: 45%;
    outline: none;
    border: none;
    font-size: 20px;
    border-radius: 5px;
    border: 1.5px solid rgba(79, 79, 79, 0.7);
    background: rgba(244, 244, 244, 0.3);
    padding: 10px;

    &:focus {
        border-color: #4a90e2;
        box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
    }

    &::placeholder {
        color: #aaa;
        opacity: 1;
    }
`;

export const NextButton = styled.button`
    width: 350px;
    height: 50px;
    border-radius: 16px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    outline: none;
    border: none;
    background: var(--Gradient-Linear, linear-gradient(90deg, #2460bc 0%, #478efa 100%));
`;

export const BackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
    border: 2px solid #ccc;

    img {
        width: 24px;
        height: auto;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

export const Categories = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

export const Textarea = styled.textarea`
    width: 45%;
    height: 120px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 20px;
    line-height: 1.5;
    resize: vertical;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #4a90e2;
        outline: none;
        box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
    }

    &::placeholder {
        color: #aaa;
        opacity: 1;
    }
`;
