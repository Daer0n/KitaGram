import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { RoomsAPI } from '@api';
import {
    SearchInput,
    SearchFilterInputContainer,
    TagsContainer,
    Tag,
    LoadMoreButton,
    HideTagsButton,
} from './styled';

interface Room {
    id: number;
    title: string;
    category: string;
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
    const [visibleTagsCount, setVisibleTagsCount] = useState(5);
    const [showAllTags, setShowAllTags] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await RoomsAPI.tags();
                const data: Tag[] = response.map((tag: any) => ({
                    id: tag.id,
                    name: tag.name,
                }));
                setTags(data);
            } catch (err) {
                console.error(err);
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
                : [...prevSelectedTags, id],
        );
    };

    const fetchRooms = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await RoomsAPI.rooms({ name: query, tags: selectedTags });
            const data: Room[] = response.map((room: any) => {
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
                    participants: room.participants,
                    participantsLimit: room.participants_limit,
                };
            });
            setRooms(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreTags = () => {
        setVisibleTagsCount(tags.length);
    };

    const hideTags = () => {
        setVisibleTagsCount(5);
        setShowAllTags(false);
    };

    return (
        <SearchFilterInputContainer>
            <SearchInput
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Поиск комнаты по названию..."
            />
            <TagsContainer>
                {tags.slice(0, showAllTags ? tags.length : visibleTagsCount).map((tag) => (
                    <Tag
                        key={tag.id}
                        onClick={() => handleTagClick(tag.id)}
                        isSelected={selectedTags.includes(tag.id)}
                    >
                        {tag.name}
                    </Tag>
                ))}
                {visibleTagsCount < tags.length && !showAllTags && (
                    <LoadMoreButton onClick={loadMoreTags}>Показать еще</LoadMoreButton>
                )}
                {visibleTagsCount > 5 && (
                    <HideTagsButton onClick={hideTags}>Скрыть </HideTagsButton>
                )}
            </TagsContainer>
        </SearchFilterInputContainer>
    );
};

export { Search };
