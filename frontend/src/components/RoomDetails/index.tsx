// RoomsList.tsx
import React, { useState, useEffect } from 'react';
import { 
  ImageContainer,
  RoomImage,
  ContentContainer,
  HeaderContainer,
  HeaderData,
  HeaderDateTime,
  HeaderTitle
} from './styled';
// import { API } from '@api';
import { Modal } from 'antd';


interface Room {
  id: number;
  name: string;
  description: string,
  imageUrl: string,
  tags: number[],
  date: string;
  time: string;
  participants: number,
  participantsLimit: number;
}

const RoomDetails: React.FC<{ room: Room | null; onClose: () => void }> = ({ room, onClose }) => {
  if (!room) return null;

  return (
    <Modal open={true} onCancel={onClose} footer={null} styles={{ content: { padding: 0, borderRadius: 20 } }} closable={false}>
      <ImageContainer>
        <RoomImage src={room.imageUrl} alt={room.name}/>
      </ImageContainer>
      <ContentContainer>
        <HeaderContainer>
          <HeaderData>
            <div>Футбол</div>
            <HeaderTitle>{room.name}</HeaderTitle>
          </HeaderData>
          <HeaderDateTime>
            <div>{room.date}</div>
            <div>{room.time}</div>
          </HeaderDateTime>
        </HeaderContainer>
        <p><strong>Participants:</strong>{room.participants}/{room.participantsLimit}</p>
      </ContentContainer>
    </Modal>
  );
};

export { RoomDetails };
