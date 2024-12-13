import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export const Element = styled.div<{ isSelected: boolean }>`
    border-radius: 20px;
    background-color: ${({ isSelected }) => (isSelected ? '#c0c0c0' : '#d9d9d9')};
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    flex: 1;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#b0b0b0' : '#c0c0c0')};
    }
`;
