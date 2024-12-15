import React, { useState, useEffect } from 'react';
import {
  SearchInput,
  SearchFilterInputContainer,
  TagsContainer,
  Tag
} from './styled';

import { notification } from 'antd';
import { RoomsAPI } from '@api';


interface Room {
  id: number;
  title: string;
  category: string,
  date: string;
  time: string;
  numberOfUsers: string;
  imgUrl: string;
}


interface Tag {
  id: number;
  name: string;
}

interface SearchProps {
  setRooms: (filteredData: any[]) => void;
  setError: (error: any) => void;
  setLoading: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ setRooms, setError, setLoading }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await RoomsAPI.tags();
        const data: Tag[] = response.map((tag: any) => {
          return { id: tag.id, name: tag.name };
        });
        setTags(data);
      } catch (err) {
        notification.error({
          message: "Error during fetching",
          description: "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [selectedTags, query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
  };

  const handleTagClick = (id: number) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id]
    );
  }

  const fetchRooms = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await RoomsAPI.rooms({ name: query, tags: selectedTags });
      const data: Room[] = response.map((room: any) => {
        const [date, timeWithZ] = room.datetime.split("T");
        const time = timeWithZ.replace("Z", "").slice(0, 5);

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
        };
      });
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

  return (
    <SearchFilterInputContainer>
      <SearchInput
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by room title..."
      />
      <TagsContainer>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            isSelected={selectedTags.includes(tag.id)}
          >
            {tag.name}
          </Tag>
        ))}
      </TagsContainer>
    </SearchFilterInputContainer>
  );
};

export { Search };
