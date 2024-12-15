import { Category } from '@types';
import { Container, ListItem } from './styled';

interface CategoriesProps {
    selectedCategory: string;
    setSelectedCategory: (selectedCategoryId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
    selectedCategory,
    setSelectedCategory,
}) => {
    const categories = [
        { id: 1, name: 'Спорт' },

        {
            id: 2,
            name: 'Еда & Напитки',
        },

        {
            id: 3,
            name: 'Искусство & Культура',
        },

        {
            id: 4,
            name: 'Наука & Технологии',
        },

        { id: 5, name: 'Природа' },

        {
            id: 6,
            name: 'Настольные игры',
        },
    ];

    return (
        <Container>
            <ul>
                {categories.map((category: Category) => (
                    <ListItem
                        key={category.id}
                        isSelected={selectedCategory === category.name}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        {category.name}
                    </ListItem>
                ))}
            </ul>
        </Container>
    );
};
