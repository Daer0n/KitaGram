import styled from 'styled-components';

export const Container = styled.div`
    width: 50%;
`;

export const ListItem = styled.li<{ isSelected: boolean }>`
    padding: 10px 15px;
    border-radius: 8px;
    background-color: ${({ isSelected }) => (isSelected ? '#438AF9' : '#f0f0f0')};
    color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#333')};
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#3a7bc1' : '#e0e0e0')};
    }
    list-style: none;
`;
