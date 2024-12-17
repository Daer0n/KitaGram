import React, { useState, useEffect } from 'react';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
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
} from './styled';
import { Search } from '@components/SearchRooms';
import { RoomDetails } from '@components/RoomDetails';
import { RoomsAPI } from '@api';
import { notification } from 'antd';
import { useFetching } from '@hooks';
import Cookies from 'js-cookie';

interface Room {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    tags: number[];
    date: string;
    time: string;
    location: string;
    participants: number;
    participantsLimit: number;
    isUserInRoom: boolean;
}

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const response = await RoomsAPI.rooms();
            const data: Room[] = await Promise.all(
                response.map(async (room: any) => {
                    const [date, timeWithZ] = room.datetime.split('T');
                    const time = timeWithZ.replace('Z', '').slice(0, 5);
                    return {
                        id: room.id,
                        name: room.name,
                        description: room.description,
                        imageUrl: room.image_url,
                        category: room.category,
                        tags: room.tags,
                        date: date,
                        time: time,
                        location: room.location,
                        participants: room.participants,
                        participantsLimit: room.participants_limit,
                        isUserInRoom: room.is_user_in_room,
                    };
                }),
            );

            setRooms(data);
        } catch (err) {
            console.error(err);
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

        if (selectedRoom && selectedRoom.id === roomId) {
            setSelectedRoom((prev) => (prev ? { ...prev, participants: newCount } : null));
        }
    };

    return (
        <div>
            <Search setRooms={setRooms} setError={setError} setLoading={setLoading} />
            <RoomsContainer>
                {rooms.map((room) => (
                    <RoomItem
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        $isUserInRoom={room.isUserInRoom}
                    >
                        <RoomsImgContainer>
                            <RoomsImg src={room.imageUrl} />
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
        </div>
    );
};

export { RoomList };
