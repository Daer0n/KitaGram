// RoomsList.tsx
import React, { useState, useEffect } from 'react';
import { RoomsContainer, RoomItem, RoomsDataContainer, RoomTitle, RoomDetails, RoomTime } from './styled';
import { Search } from "@components/SearchRooms"

interface Room {
  id: number;
  title: string;
  date: string;
  time: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);


  // Fetch open rooms
  useEffect(() => {
    
    const fetchOpenRooms = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/opRoom/get_open_rooms');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch rooms');
        // }
        // const data: Room[] = await response.json();
        const data: Room[] = [
          { id: 0, title: "Бар ‘Zauglom’", date: "9 октября", time: "20:00" },
          { id: 1, title: "Бар ‘Суета’", date: "10 октября", time: "23:00" },
          { id: 2, title: "Финал ЛЧ", date: "10 октября", time: "23:00" },
          { id: 3, title: "Бар ‘Суета’", date: "10 октября", time: "23:00" },
          { id: 4, title: "Бар ‘Пивной бункер Со2’", date: "15 октября", time: "19:30" },
        ];
        setRooms(data);
      } catch (err: any) {
        setError('Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchOpenRooms();
  }, []);


  return (
    <div>
      {/* <Search onSearch={setFilteredRooms} onError={setError} /> */}

      <RoomsContainer>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {rooms.map((room) => (
          <RoomItem key={room.id} onClick={() => console.log(`Join room ${room.id}`)}>
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
