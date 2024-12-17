import React, { useEffect, useState } from 'react';
import { RoomsAPI, UserAPI } from '@api';
import {
    ModalContainer,
    ImageContainer,
    RoomImage,
    ContentContainer,
    HeaderContainer,
    HeaderData,
    Category,
    HeaderTitle,
    DateTime,
    HeaderLocation,
    TagsContainer,
    Tag,
    ParticipantsInfo,
    Avatars,
    Avatar,
    ButtonContainer,
    Button,
    Description,
    Subtitle,
    DescriptionContainer,
} from './styled';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
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
    isUserInRoom: boolean;
    location: string;
}

interface RoomDetailsProps {
    room: Room | null;
    onClose: () => void;
    onUpdateParticipants: (count: number) => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, onClose, onUpdateParticipants }) => {
    const [usersAvatar, setUsersAvatar] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    if (!room) return null;

    const handleJoinRoom = async () => {
        try {
            await RoomsAPI.joinIntoRoom(room.id);
            onUpdateParticipants(room.participants + 1);
            notification.success({
                message: `Вы успешно вступили в комнату: ${room.name}`,
            });
        } catch (err) {
            console.error(err);
            notification.error({
                message: 'Ошибка при вступлении в комнату',
            });
        }
        onClose();
    };

    console.log(room);

    const handleLeaveRoom = async () => {
        try {
            await RoomsAPI.leaveRoom(room.id);
            onUpdateParticipants(room.participants - 1);
            notification.success({
                message: `Вы успешно покинули комнату: ${room.name}`,
            });
        } catch (err) {
            console.error(err);
            notification.error({
                message: 'Ошибка при выходе из комнаты',
            });
        }
        onClose();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await RoomsAPI.getRoomParticipants(room.id);
                const usersId = data.map((user: any) => user.user_id);
                const usersInfo = await Promise.all(
                    usersId.map((id: string) => UserAPI.getInfoAboutUser(id)),
                );
                const avatars = usersInfo.map((user) => user.img_path);
                setUsersAvatar(avatars);
            } catch (error) {
                console.error('Ошибка при получении участников комнаты:', error);
            }
        };

        fetchData();
    }, [room.id]);

    useEffect(() => {
        const data = room.tags;
        const roomsTags = data.map((tag: any) => tag.name);
        setTags(roomsTags);
    }, [room.tags]);

    const locationCoordinates = room.location ? JSON.parse(room.location) : null;

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            width="60vw"
            styles={{
                content: { padding: 0, borderRadius: 20 },
                body: { display: 'block' },
            }}
            closable={false}
        >
            <ModalContainer>
                <ImageContainer>
                    <RoomImage src={room.imageUrl} alt={room.name} />
                </ImageContainer>

                <ContentContainer>
                    <HeaderContainer>
                        <HeaderData>
                            <Category>{room.category}</Category>
                            <HeaderTitle>{room.name}</HeaderTitle>
                            <DateTime>
                                <span>{room.date}</span> | <span>{room.time}</span>
                            </DateTime>
                        </HeaderData>
                        <ButtonContainer>
                            {room.participants < room.participantsLimit && !room.isUserInRoom && (
                                <Button onClick={handleJoinRoom}>Вступить</Button>
                            )}
                            {room.isUserInRoom && (
                                <Button isLeaveButton={true} onClick={handleLeaveRoom}>
                                    Выйти
                                </Button>
                            )}
                        </ButtonContainer>
                    </HeaderContainer>

                    <DescriptionContainer>
                        <Subtitle>Описание:</Subtitle>
                        <Description>{room.description}</Description>
                    </DescriptionContainer>

                    <HeaderLocation>
                        <Subtitle>Место:</Subtitle>
                        <YMaps>
                            <Map
                                defaultState={{
                                    center: locationCoordinates,
                                    zoom: 10,
                                }}
                                style={{ height: '300px', borderRadius: '10px' }}
                            >
                                {locationCoordinates && (
                                    <Placemark
                                        geometry={locationCoordinates}
                                        options={{
                                            preset: 'islands#icon',
                                            iconColor: '#0095b6',
                                        }}
                                    />
                                )}
                            </Map>
                        </YMaps>
                    </HeaderLocation>

                    {tags.length > 0 && (
                        <TagsContainer>
                            {tags.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </TagsContainer>
                    )}

                    <ParticipantsInfo>
                        <strong>Участники:</strong> {room.participants}/{room.participantsLimit}
                    </ParticipantsInfo>

                    {usersAvatar.length > 0 && (
                        <Avatars>
                            {usersAvatar.map((photo) => (
                                <Avatar key={photo}>
                                    <img src={photo} alt="avatar" />
                                </Avatar>
                            ))}
                        </Avatars>
                    )}
                </ContentContainer>
            </ModalContainer>
        </Modal>
    );
};

export { RoomDetails };
