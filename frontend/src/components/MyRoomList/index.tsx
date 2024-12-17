import React, { useState, useEffect } from 'react';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import { RoomDetails } from '@components/RoomDetails';
import { RoomEdit } from '@components/RoomEdit';
import { RoomsAPI } from '@api';
import { useFetching } from '@hooks';
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
    Title,
    Content,
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
    location: string;
}

const MyRoomList: React.FC = () => {
    const [joinedRooms, setJoinedRooms] = useState<Room[]>([]);
    const [myRooms, setMyRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [fetchJoinedRooms] = useFetching(async () => {
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
                        location: room.location,
                    };
                }),
            );
            setJoinedRooms(data);
        } catch (err) {
            console.log(err);
        }
    });

    const fetchMyRooms = async () => {
        try {
            const response = await RoomsAPI.getMyRooms();
            const data: Room[] = await Promise.all(
                response.map(async (room: any) => {
                    const [date, timeWithZ] = room.datetime.split('T');
                    const time = timeWithZ.replace('Z', '').slice(0, 5);
                    const roomsParticipants = await RoomsAPI.getRoomParticipants(room.id);
                    const userId = Cookies.get('id');
                    const buf = roomsParticipants.map((partcipant) => partcipant.user_id);
                    const isUserInRoom = buf.includes(userId);
                    console.log(isUserInRoom);

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
                        location: room.location,
                    };
                }),
            );
            setMyRooms(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMyRooms();
    }, []);

    useEffect(() => {
        fetchJoinedRooms();
    }, []);

    const updateParticipantsCount = (roomId: number, newCount: number) => {
        setJoinedRooms((prevRooms) =>
            prevRooms.map((room) =>
                room.id === roomId ? { ...room, participants: newCount } : room,
            ),
        );
    };

    return (
        <Container>
            {joinedRooms.length > 0 && (
                <Content>
                    <Title>Вы участвуете</Title>
                    <RoomsContainer>
                        {joinedRooms.map((room) => (
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
                                            <RoomUsersImg
                                                src={DefaultAvatar}
                                                alt="default avatar"
                                            />
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
                </Content>
            )}

            {myRooms.length > 0 && (
                <Content>
                    <Title>Вы создали</Title>
                    <RoomsContainer>
                        {myRooms.map((room) => (
                            <RoomItem
                                key={room.id}
                                onClick={() => {
                                    setSelectedRoom(room);
                                    setIsEditing(true);
                                }}
                            >
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
                                            <RoomUsersImg
                                                src={DefaultAvatar}
                                                alt="default avatar"
                                            />
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
                </Content>
            )}

            {selectedRoom && isEditing && (
                <RoomEdit
                    room={selectedRoom}
                    visible={isEditing}
                    onClose={() => {
                        setIsEditing(false);
                        setSelectedRoom(null);
                    }}
                    onUpdateRoom={(updatedRoom) => {
                        setMyRooms((prev) =>
                            prev.map((r) =>
                                r.id === updatedRoom.id ? { ...r, ...updatedRoom } : r,
                            ),
                        );
                    }}
                />
            )}

            {selectedRoom && !isEditing && (
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
