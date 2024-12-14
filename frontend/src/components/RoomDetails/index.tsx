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
import { API } from '@api';
import { Modal } from 'antd';



interface Room {
  id: number;
  title: string;
  category: string,
  date: string;
  time: string;
  numberOfUsers: string;
  imgUrl: string;
}

const RoomDetails: React.FC<{ room: Room | null; onClose: () => void }> = ({ room, onClose }) => {
  if (!room) return null;

  return (
    <Modal open={true} onCancel={onClose} footer={null} styles={{ content: { padding: 0, borderRadius: 20 } }} closable={false}>
      <ImageContainer>
        <RoomImage src={room.imgUrl} alt={room.title}/>
      </ImageContainer>
      <ContentContainer>
        <HeaderContainer>
          <HeaderData>
            <div>{room.category}</div>
            <HeaderTitle>{room.title}</HeaderTitle>
          </HeaderData>
          <HeaderDateTime>
            <div>{room.date}</div>
            <div>{room.time}</div>
          </HeaderDateTime>
        </HeaderContainer>
        <p><strong>Participants:</strong> {room.numberOfUsers}</p>
      </ContentContainer>
    </Modal>
  );
};

export { RoomDetails };
