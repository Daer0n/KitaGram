// RoomsList.tsx
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
import { RoomDetails } from '@components/RoomDetails';
import { RoomsAPI } from '@api';
import { notification } from 'antd';



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


const MyRoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, _] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);


  // Fetch open rooms
  useEffect(() => {

    const fetchOpenRooms = async () => {
      setLoading(true);
      try {
        const response = await RoomsAPI.getJoinedRooms();
        const data: Room[] = response.map((room: any) => {
          const [date, timeWithZ] = room.datetime.split("T");
          const time = timeWithZ.replace("Z", "").slice(0, 5);

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
          message: "Error during fetching",
          description: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOpenRooms();
  }, []);


  return (
    <div>
      <RoomsContainer>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {rooms.map((room) => (
          <RoomItem key={room.id} onClick={() => setSelectedRoom(room)}>
            <RoomsImgContainer>
              <RoomsImg src={room.imageUrl} />
            </RoomsImgContainer>
            <RoomsDataContainer>

              <RoomGeneralData>
                <RoomType>Футбол</RoomType>
                <RoomTitle>{room.name}</RoomTitle>
                <RoomUsers>
                  <div>{room.participants}/{room.participantsLimit}</div>
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
        <RoomDetails room={selectedRoom} onClose={() => setSelectedRoom(null)} isLeaveButton={true} />
      )}
    </div>

  );
};

export { MyRoomList };
