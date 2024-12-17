import styled from 'styled-components';

// Container for the list of rooms
export const RoomsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 24px;
    font-family: 'Arial', sans-serif;
    background-color: #f5f7fb;
`;

// Each individual room item

interface RoomItemProps {
    $isuserinroom: boolean;
}

export const RoomItem = styled.div<RoomItemProps>`
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background: ${({ $isuserinroom }) =>
        $isuserinroom
            ? 'linear-gradient(135deg, #6a5acd, #8a2be2)' 
            : 'linear-gradient(135deg, #4c90ff, #2460bc)'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #fff;
    overflow: hidden;
    cursor: pointer;
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }
`;

// Image container for room thumbnails
export const RoomsImgContainer = styled.div`
    width: 100%;
    position: relative;
`;

// Room image styling
export const RoomsImg = styled.img`
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-bottom: 4px solid rgba(255, 255, 255, 0.1);
`;

// Data container for room details
export const RoomsDataContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
`;

// General data like name and category
export const RoomGeneralData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

// Title styling for the room
export const RoomTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    line-height: 1.4;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

// Type or category of the room
export const RoomType = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #d1e5ff;
`;

// User information container
export const RoomUsers = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 14px;
`;

// User avatar styling
export const RoomUsersImg = styled.img`
    height: 16px;
    width: 16px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    border-radius: 50%;
`;

// Room date and time container
export const RoomDateTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    color: #e1f0ff;
`;

// Date styling
export const RoomDate = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #d1e5ff;
`;

// Time styling
export const RoomTime = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`;

// Empty state or error message container
export const ErrorMessage = styled.p`
    font-size: 16px;
    color: red;
    text-align: center;
    margin-top: 20px;
`;
