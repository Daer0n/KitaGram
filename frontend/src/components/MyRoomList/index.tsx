// RoomsList.tsx
import React, { useState, useEffect } from 'react';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import { RoomDetails } from '@components/RoomDetails';
import { RoomsAPI } from '@api';
import { notification } from 'antd';
import { useFetching } from '@hooks';
import { Loader } from '@components/Loader';
import {
    RoomsContainer,
    RoomItem,
    RoomsImgContainer,
    RoomsImg,
    RoomsDataContainer,
    RoomTitle,
    RoomDate,
    RoomTime,
    RoomDateTime,
    RoomGeneralData,
    RoomType,
    RoomUsers,
    RoomUsersImg,
    Container,
} from './styled';

interface Room {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    tags: number[];
    date: string;
    time: string;
    participants: number;
    participantsLimit: number;
}

const MyRoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const response = await RoomsAPI.getJoinedRooms();
            const data: Room[] = response.map((room: any) => {
                const [date, timeWithZ] = room.datetime.split('T');
                const time = timeWithZ.replace('Z', '').slice(0, 5);

                return {
                    id: room.id,
                    name: room.name,
                    description: room.description,
                    imageUrl: room.image_url,
                    tags: room.tags,
                    date: date,
                    time: time,
                    participants: room.participants,
                    participantsLimit: room.participants_limit,
                };
            });
            setRooms(data);
        } catch (err) {
            console.log(err);
            notification.error({
                message: 'Error during fetching',
                description: '',
            });
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            {isLoading ? (
                <Loader />
            ) : (
                <RoomsContainer>
                    {rooms.map((room) => (
                        <RoomItem key={room.id} onClick={() => setSelectedRoom(room)}>
                            <RoomsImgContainer>
                                <RoomsImg src={room.imageUrl} alt={room.name} />
                            </RoomsImgContainer>
                            <RoomsDataContainer>
                                <RoomGeneralData>
                                    <RoomType>Футбол</RoomType>
                                    <RoomTitle>{room.name}</RoomTitle>
                                    <RoomUsers>
                                        <div>
                                            {room.participants}/{room.participantsLimit}
                                        </div>
                                        <RoomUsersImg src={DefaultAvatar} alt="default avatar" />
                                    </RoomUsers>
                                </RoomGeneralData>
                                <RoomDateTime>
                                    <RoomDate>{room.date}</RoomDate>
                                    <RoomTime>{room.time}</RoomTime>
                                </RoomDateTime>
                            </RoomsDataContainer>
                        </RoomItem>
                    ))}
                </RoomsContainer>
            )}
            {selectedRoom && (
                <RoomDetails
                    room={selectedRoom}
                    onClose={() => setSelectedRoom(null)}
                    isLeaveButton={true}
                />
            )}
        </Container>
    );
};

export { MyRoomList };
