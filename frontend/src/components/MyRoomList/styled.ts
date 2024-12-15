// styled.ts
import styled from 'styled-components';

8

// Container for the list of rooms
export const RoomsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 16px;
  font-family: Arial, sans-serif;
`;

// Each individual room item
export const RoomItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: var(--Gradient-Linear, linear-gradient(90deg, #2460bc 0%, #478efa 100%));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const RoomsImgContainer = styled.div`
  width: 100%;
`;

export const RoomsImg = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

export const RoomsDataContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 5px 10px;
`;

export const RoomGeneralData = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const RoomDateTime = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Room title styling
export const RoomTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

export const RoomType = styled.span`
  display: flex;
  align-items: center;
`;

export const RoomUsers = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const RoomUsersImg = styled.img`
  height: 13px;
  width: auto;
  object-fit: contain;
  filter: invert(1);
`;


export const RoomDate = styled.div`
  font-size: 18px;
`;

export const RoomTime = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

