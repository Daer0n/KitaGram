import { Tag } from '@types';
import { Container, Element } from './styled';

interface TagsProps {
  tags: Tag[];
  selectedTags: number[];
  setSelectedTags: (tagsId: number[]) => void;
}

export const Tags: React.FC<TagsProps> = ({ tags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tagID: number) => {
    setSelectedTags((prevSelectedTags: number[]) => {
      if (prevSelectedTags.includes(tagID)) {
        return prevSelectedTags.filter((id: number) => id !== tagID);
      } else {
        return [...prevSelectedTags, tagID];
      }
    });
  };

  return (
    <Container>
      {tags.map((tag: Tag) => (
        <Element
          key={tag.id}
          onClick={() => toggleTag(tag.id)}
          isSelected={selectedTags.includes(tag.id)}
        >
          {tag.name}
        </Element>
      ))}
    </Container>
  );
};
