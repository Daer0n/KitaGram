import React from 'react';
import { RoomsAPI } from '@api';
import {
    ImageContainer,
    RoomImage,
    ContentContainer,
    HeaderContainer,
    HeaderData,
    HeaderDateTime,
    HeaderTitle,
    Button,
} from './styled';
import { Modal, notification } from 'antd';

interface Room {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    tags: number[];
    date: string;
    time: string;
    category: string;
    participants: number;
    participantsLimit: number;
}

interface RoomDetailsProps {
    room: Room | null;
    onClose: () => void;
    isLeaveButton: boolean;
    onUpdateParticipants: (count: number) => void; // Функция для обновления участников
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
    room,
    onClose,
    isLeaveButton,
    onUpdateParticipants,
}) => {
    if (!room) return null;

    const handleJoinRoom = async () => {
        try {
            await RoomsAPI.joinIntoRoom(room.id);
            onUpdateParticipants(room.participants + 1); // Увеличиваем счетчик участников

            notification.success({
                message: `Successfully joined the room: ${room.name}`,
                description: '',
            });
        } catch (err) {
            console.log(err);
            notification.error({
                message: 'Error during joining the room',
                description: '',
            });
        }
    };

    const handleLeaveRoom = async () => {
        try {
            await RoomsAPI.leaveRoom(room.id);
            onUpdateParticipants(room.participants - 1); // Уменьшаем счетчик участников

            notification.success({
                message: `Successfully left the room: ${room.name}`,
                description: '',
            });
        } catch (err) {
            console.log(err);
            notification.error({
                message: 'Error during leaving the room',
                description: '',
            });
        }
    };

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            styles={{ content: { padding: 0, borderRadius: 20 } }}
            closable={false}
        >
            <ImageContainer>
                <RoomImage src={room.imageUrl} alt={room.name} />
            </ImageContainer>
            <ContentContainer>
                <HeaderContainer>
                    <HeaderData>
                        <div>{room.category}</div>
                        <HeaderTitle>{room.name}</HeaderTitle>
                    </HeaderData>
                    <HeaderDateTime>
                        <div>{room.date}</div>
                        <div>{room.time}</div>
                    </HeaderDateTime>
                </HeaderContainer>
                <p>
                    <strong>Participants:</strong>
                    {room.participants}/{room.participantsLimit}
                </p>
                <Button
                    isLeaveButton={isLeaveButton}
                    onClick={isLeaveButton ? handleLeaveRoom : handleJoinRoom}
                >
                    {isLeaveButton ? 'Выйти' : 'Вступить'}
                </Button>
            </ContentContainer>
        </Modal>
    );
};

export { RoomDetails };
