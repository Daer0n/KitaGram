import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    padding: 100px;
    margin: 100px;
    width: 50%;
    min-height: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    position: relative;
`;

export const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 65px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.408px;
    margin-top: 50px;
`;

export const Description = styled.div`
    color: #000;
    font-family: Montserrat;
    font-size: 35px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const Block = styled.div`
    display: flex;
    gap: 30px;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input`
    width: 45%;
    outline: none;
    border: none;
    font-size: 30px;
    border-radius: 5px;
    border: 1.5px solid rgba(79, 79, 79, 0.7);
    background: rgba(244, 244, 244, 0.3);
    padding: 10px;
`;

// export const Photos = styled.div`
//     width: 100%;
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//     gap: 20px;
//     align-items: start;
//     justify-items: center;
//     justify-content: center;
//     align-content: start;

//     & > :only-child {
//         grid-column: 1 / -1;
//         display: flex;

//         align-items: center;
//         flex-direction: column;
//     }
// `;

// export const AddPhoto = styled.div`
//     width: 320px;
//     height: 200px;
//     border: 2px dashed #ccc;
//     border-radius: 10px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 24px;
//     color: #aaa;
//     cursor: pointer;
// `;

// export const Photo = styled.div`
//     width: 320px;
//     height: 200px;
//     border-radius: 5px;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     img {
//         max-width: 100%;
//         height: 100%;
//         border-radius: 5px;
//         border: 1.5px solid rgba(79, 79, 79, 0.7);
//     }
// `;

export const NextButton = styled.button`
    width: 350px;
    height: 50px;
    border-radius: 16px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    outline: none;
    border: none;
    background: var(--Gradient-Linear, linear-gradient(90deg, #2460bc 0%, #478efa 100%));
`;

export const BackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;

    img {
        width: 24px;
        height: auto;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

export const Categories = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;
