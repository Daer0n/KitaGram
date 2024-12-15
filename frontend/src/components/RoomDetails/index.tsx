// RoomsList.tsx
import React from 'react';
import { RoomsAPI } from '@api';
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
import { Modal, notification } from 'antd';


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

  const handleJoinRoom = async () => {
    try {
      await RoomsAPI.joinIntoRoom(room.id);

      notification.success({
        message: `Successfully joined into the room: ${room.name}`,
        description: "",
      });

    } catch (err) {
      console.log(err);
      notification.error({
        message: "Error during fetching",
        description: "",
      });
    }

  };

  return (
    <Modal open={true} onCancel={onClose} footer={null} styles={{ content: { padding: 0, borderRadius: 20 } }} closable={false}>
      <ImageContainer>
        <RoomImage src={room.imageUrl} alt={room.name} />
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
        <button onClick={handleJoinRoom}>Вступить</button>
      </ContentContainer>
    </Modal>
  );
};

export { RoomDetails };
