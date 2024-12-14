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
import { Search } from "@components/SearchRooms";
import { RoomDetails } from '@components/RoomDetails';
import { API } from '@api';
import { notification, Modal } from 'antd';



interface Room {
  id: number;
  title: string;
  category: string,
  date: string;
  time: string;
  numberOfUsers: string;
  imgUrl: string;
}


const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);


  // Fetch open rooms
  useEffect(() => {
    
    const fetchOpenRooms = async () => {
      setLoading(true);
        const data: Room[] = [
          { id: 0, title: "Бар ‘Zauglom’", category: "Бар", date: "9 октября", time: "20:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
          { id: 1, title: "Бар ‘Суета’", category: "Бар", date: "10 октября", time: "23:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
          { id: 2, title: "Финал ЛЧ", category: "Футбол", date: "10 октября", time: "23:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
          { id: 3, title: "Бар ‘Суета’", category: "Бар", date: "10 октября", time: "23:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
          { id: 4, title: "Бар ‘Пивной бункер Со2’", category: "Бар", date: "15 октября", time: "19:30", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
        ];
      try {
        // const test: Room[] = await API.rooms();
        // console.log(test);
        setRooms(data);
      } catch (err) {
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
      <Search setRooms={setRooms} setError={setError} setLoading={setLoading} />
      <RoomsContainer>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {rooms.map((room) => (
          <RoomItem key={room.id} onClick={() => setSelectedRoom(room)}>
            <RoomsImgContainer>
              <RoomsImg src={room.imgUrl} />
            </RoomsImgContainer>
            <RoomsDataContainer>

              <RoomGeneralData>
                <RoomType>{room.category}</RoomType>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomUsers>
                  <div>{room.numberOfUsers}</div>
                  <RoomUsersImg src={DefaultAvatar} alt="default avatar"/>
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
        <RoomDetails room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </div>

  );
};

export { RoomList };
