import React, { useState } from 'react';
import { SearchInput, SearchInputContainer } from './styled';

interface Room {
  id: number;
  title: string;
  date: string;
  time: string;
  imgUrl: string;
}

interface SearchProps {
  onSearch: (filteredData: any[]) => void;
  onError: (error: any) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch, onError }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    fetchRoomsByName(searchQuery);
  };

  const fetchRoomsByName = async (name: string): Promise<void> => {
    try {
      // const response = await fetch('/opRoom/get_open_rooms_by_name', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(name), 
      // });
      // onSearch(await response.json());
      const data: Room[] = [
        { id: 0, title: "Бар ‘Zauglom’", date: "9 октября", time: "20:00", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
        { id: 1, title: "Бар ‘Суета’", date: "10 октября", time: "23:00", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
        { id: 4, title: "Бар ‘Пивной бункер Со2’", date: "15 октября", time: "19:30", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
      ];
      onSearch(data);
    } catch (err) {
      console.error('Error fetching rooms by name:', err);
      onError('Failed to fetch rooms by name.');
    } finally {

    }
  };

  return (
    <SearchInputContainer>
      <SearchInput
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by room title..."
      />
    </SearchInputContainer>
  );
};

export { Search };
