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
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 0 0 20px 20px;
`;

export const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 5fr 3fr;
    gap: 10px;
    margin-bottom: 15px;
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
    align-items: flex-end;
`;

export const HeaderLocation = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-style: italic;
`;

export const HeaderTitle = styled.h2`
    margin: 0;
    font-size: 1.5em;
    color: #333;
`;

export const Button = styled.button<{ isLeaveButton?: boolean }>`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    background-color: ${({ isLeaveButton }) => (isLeaveButton ? '#ff4d4f' : '#4caf50')};

    &:hover {
        background-color: ${({ isLeaveButton }) => (isLeaveButton ? '#ff7875' : '#45a049')};
    }

    &:focus {
        outline: none;
    }
`;

export const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ecebeb;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Avatars = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    margin: 20px 0;
`;

export const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;

export const Tag = styled.div`
    border-radius: 20px;
    background-color: #ff5c5c;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;

    &:hover {
        background-color: #e63939;
    }
`;

export const ParticipantsInfo = styled.p`
    margin: 10px 0;
    font-weight: bold;
    color: #555;
`;
