import { Tag } from '@types';
import { Container, Element } from './styled';

interface TagsProps {
    tags: Tag[];
    selectedTags: string[];
    setSelectedTags: (tagsId: string[]) => void;
}

export const Tags: React.FC<TagsProps> = ({ tags, selectedTags, setSelectedTags }) => {
    const toggleTag = (tagID: string) => {
        setSelectedTags((prevSelectedTags: string[]) => {
            if (prevSelectedTags.includes(tagID)) {
                return prevSelectedTags.filter((id: string) => id !== tagID);
            } else {
                return [...prevSelectedTags, tagID];
            }
        });
    };

    return (
        <Container>
            {tags.map((tag: Tag) => (
                <Element
                    key={tag.ID}
                    onClick={() => toggleTag(tag.ID)}
                    isSelected={selectedTags.includes(tag.ID)}
                >
                    {tag.Name}
                </Element>
            ))}
        </Container>
    );
};
