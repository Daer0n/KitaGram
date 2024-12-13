import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    align-items: start;
    justify-items: center;
    justify-content: center;
    align-content: start;

    & > :only-child {
        grid-column: 1 / -1;
        display: flex;

        align-items: center;
        flex-direction: column;
    }
`;

export const AddPhoto = styled.div`
    width: 320px;
    height: 200px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #aaa;
    cursor: pointer;
`;

export const Photo = styled.div`
    width: 320px;
    height: 200px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        max-width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1.5px solid rgba(79, 79, 79, 0.7);
    }
`;