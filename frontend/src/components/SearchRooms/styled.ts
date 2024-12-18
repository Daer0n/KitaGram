import styled from 'styled-components';

export const SearchFilterInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 24px 24px 0 24px;
`;

export const SearchInput = styled.input`
    padding: 12px;
    font-size: 16px;
    width: 600px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
`;

export const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const Tag = styled.div<{ isSelected: boolean }>`
    border-radius: 20px;
    padding: 10px 16px;
    font-size: 14px;
    border: 2px solid ${({ isSelected }) => (isSelected ? '#ff1a1a' : 'transparent')};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
    background-color: ${({ isSelected }) => (isSelected ? '#ff5c5c' : '#e0e0e0')};

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
`;

export const LoadMoreButton = styled.button`
    border-radius: 20px;
    padding: 10px 16px;
    font-size: 14px;
    border: 2px solid #438af9;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    background-color: #438af9;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const HideTagsButton = styled.button`
    border-radius: 20px;
    padding: 10px 16px;
    font-size: 14px;
    border: 2px solid #ff5c5c;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    background-color: #ff5c5c;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
    