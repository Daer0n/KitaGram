import styled from 'styled-components';

export const ImageContainer = styled.div`
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
`;

export const RoomImage = styled.img`
    border-radius: 20px 20px 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ContentContainer = styled.div`
    padding: 10px 20px;
`;

export const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 5fr 4fr;
`;

export const HeaderData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const HeaderDateTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
`;

export const HeaderTitle = styled.h2`
    margin: 0;
`;

export const Button = styled.button<{ isLeaveButton: boolean }>`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    background-color: ${({ isLeaveButton }) =>
        isLeaveButton ? '#ff4d4f' : '#4caf50'}; // Красный для "Выйти", зеленый для "Вступить"

    &:hover {
        background-color: ${({ isLeaveButton }) =>
            isLeaveButton ? '#ff7875' : '#45a049'}; // Светлее при наведении
    }

    &:focus {
        outline: none;
    }
`;
