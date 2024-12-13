// RoomsList.tsx
import React, { useState, useEffect } from 'react';
import { 
  RoomsContainer, 
  RoomItem, 
  RoomsImgContainer,
  RoomsImg,
  RoomsDataContainer, 
  RoomTitle, 
  RoomDetails, 
  RoomTime 
} from './styled';
import { Search } from "@components/SearchRooms";
import { API } from '@api';
import { notification } from 'antd';



interface Room {
  id: number;
  title: string;
  date: string;
  time: string;
  imgUrl: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch open rooms
  useEffect(() => {
    
    const fetchOpenRooms = async () => {
      setLoading(true);
        const data: Room[] = [
          { id: 0, title: "Бар ‘Zauglom’", date: "9 октября", time: "20:00", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
          { id: 1, title: "Бар ‘Суета’", date: "10 октября", time: "23:00", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
          { id: 2, title: "Финал ЛЧ", date: "10 октября", time: "23:00", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
          { id: 3, title: "Бар ‘Суета’", date: "10 октября", time: "23:00", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
          { id: 4, title: "Бар ‘Пивной бункер Со2’", date: "15 октября", time: "19:30", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
        ];
      try {
        const test: Room[] = await API.rooms();
        console.log(test);
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
      <Search onSearch={setRooms} onError={setError} />
      <RoomsContainer>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {rooms.map((room) => (
          <RoomItem key={room.id} onClick={() => console.log(`Join room ${room.id}`)}>
            <RoomsImgContainer>
              <RoomsImg src={room.imgUrl} />
            </RoomsImgContainer>
            <RoomsDataContainer>
              <RoomTitle>{room.title}</RoomTitle>
              <RoomDetails>{room.date}</RoomDetails>
              <RoomTime>{room.time}</RoomTime>
            </RoomsDataContainer>
          </RoomItem>
        ))}
      </RoomsContainer>
    </div>

  );
};

export { RoomList };
