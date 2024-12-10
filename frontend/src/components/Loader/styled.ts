import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1000;
`;

export const StyledLoader = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 6px dashed #438af9;
    animation: ${rotate} 2s infinite linear;
    z-index: 1000;
`;
