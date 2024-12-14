import { Category } from '@types';
import { Container, ListItem } from './styled';

interface CategoriesProps {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (selectedCategoryId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    return (
        <Container>
            <ul>
                {categories.map((category: Category) => (
                    <ListItem
                        key={category.id}
                        isSelected={selectedCategory === category.id} 
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </ListItem>
                ))}
            </ul>
        </Container>
    );
};
