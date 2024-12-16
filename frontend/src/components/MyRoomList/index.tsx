import React, { useState, useEffect } from 'react';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import { RoomDetails } from '@components/RoomDetails';
import { RoomsAPI } from '@api';
import { notification } from 'antd';
import { useFetching } from '@hooks';
import { Loader } from '@components/Loader';
import Cookies from 'js-cookie';
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
    category: string;
    participantsLimit: number;
    isUserInRoom: boolean;
}

const MyRoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const response = await RoomsAPI.getJoinedRooms();
            const data: Room[] = await Promise.all(
                response.map(async (room: any) => {
                    const [date, timeWithZ] = room.datetime.split('T');
                    const time = timeWithZ.replace('Z', '').slice(0, 5);
                    const roomsParticipants = await RoomsAPI.getRoomParticipants(room.id);
                    const userId = Cookies.get('id');
                    const isUserInRoom = roomsParticipants.some(
                        (participant: any) => participant.user_id === userId,
                    );

                    return {
                        id: room.id,
                        name: room.name,
                        description: room.description,
                        imageUrl: room.image_url,
                        category: room.category,
                        tags: room.tags,
                        date: date,
                        time: time,
                        participants: room.participants,
                        participantsLimit: room.participants_limit,
                        isUserInRoom,
                    };
                }),
            );
            setRooms(data);
        } catch (err) {
            console.log(err);
        }
    });

    useEffect(() => {
        fetchData();
    }, [selectedRoom]);

    const updateParticipantsCount = (roomId: number, newCount: number) => {
        setRooms((prevRooms) =>
            prevRooms.map((room) =>
                room.id === roomId ? { ...room, participants: newCount } : room,
            ),
        );
    };

    return (
        <Container>
            <RoomsContainer>
                {rooms.map((room) => (
                    <RoomItem key={room.id} onClick={() => setSelectedRoom(room)}>
                        <RoomsImgContainer>
                            <RoomsImg src={room.imageUrl} alt={room.name} />
                        </RoomsImgContainer>
                        <RoomsDataContainer>
                            <RoomGeneralData>
                                <RoomType>{room.category}</RoomType>
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

            {selectedRoom && (
                <RoomDetails
                    room={selectedRoom}
                    onClose={() => setSelectedRoom(null)}
                    onUpdateParticipants={(newCount) =>
                        updateParticipantsCount(selectedRoom.id, newCount)
                    }
                />
            )}
        </Container>
    );
};

export { MyRoomList };
