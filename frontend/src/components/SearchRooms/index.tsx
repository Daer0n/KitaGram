import React, { useState, useEffect } from 'react';
import { 
  SearchInput, 
  SearchFilterInputContainer, 
  CategoriesContainer, 
  Category
} from './styled';

import { notification } from 'antd';
// import { API } from '@api';


interface Room {
  id: number;
  title: string;
  category: string,
  date: string;
  time: string;
  numberOfUsers: string;
  imgUrl: string;
}


interface Category {
  id: number;
  name: string;
}

interface SearchProps {
  setRooms: (filteredData: any[]) => void;
  setError: (error: any) => void;
  setLoading: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ setRooms, setError, setLoading }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
        const data: Category[] = [{id: 1, name: "Футбол"}, {id: 2, name: "Бар"}];
      try {
        // const test: Room[] = await API.rooms();
        // console.log(test);
        setCategories(data);
      } catch (err) {
          notification.error({
              message: "Error during fetching",
              description: "",
          });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    fetchRoomsByName(searchQuery);
  };

  const fetchRoomsByName = async (name: string): Promise<void> => {
    try {
      setLoading(true);

      // const data: Room[] = await API.roomsByName({ name });
      // console.log(data);
      const data: Room[] = [
        { id: 4, title: "Бар ‘Пивной бункер Со2’", category: "Бар", date: "15 октября", time: "19:30", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
      ];
      setRooms(data);
    } catch (err) {
      console.error('Error fetching rooms by name:', err);
      setError('Failed to fetch rooms by name.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomsByCategory = async (categoryID: number): Promise<void> => {
    try {
      setLoading(true);
      // const data: Room[] = await API.roomsByCategory({ category });
      // console.log(data);
      const data: Room[] = [
        { id: 0, title: "Бар ‘Zauglom’", category: "Бар", date: "9 октября", time: "20:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
        { id: 1, title: "Бар ‘Суета’", category: "Бар", date: "10 октября", time: "23:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380" },
        { id: 2, title: "Финал ЛЧ", category: "Футбол", date: "10 октября", time: "23:00", numberOfUsers: "1/10", imgUrl: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1732960777~exp=1732964377~hmac=3f2ff788ffe0657141d44602f68e7b8cc8f508b34cb90aa3315c69673cc6ff3d&w=1380"  },
      ];
      setRooms(data);
    } catch (err) {
      console.error('Error fetching rooms by name:', err);
      setError('Failed to fetch rooms by name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchFilterInputContainer>
      <SearchInput
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by room title..."
      />
      <CategoriesContainer>
        {categories.map((category) => (
          <Category key={category.id} onClick={() => fetchRoomsByCategory(category.id)}>{category.name}</Category>
        ))}
      </CategoriesContainer>
    </SearchFilterInputContainer>
  );
};

export { Search };
