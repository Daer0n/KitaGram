import React, { useState } from 'react';
import { SearchInput } from './styled';

interface Room {
  id: number;
  title: string;
  date: string;
  time: string;
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
      const response = await fetch('/opRoom/get_open_rooms_by_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name), 
      });
      onSearch(await response.json());
    } catch (err) {
      console.error('Error fetching rooms by name:', err);
      onError('Failed to fetch rooms by name.');
    } finally {

    }
  };

  return (
    <div>
      <SearchInput
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by room title..."
      />
    </div>
  );
};

export default Search;
