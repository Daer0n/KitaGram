// styled.ts
import styled from 'styled-components';


export const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
`;

export const RoomImage = styled.img`
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  padding: 10px 20px;
`;

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr;
`;

export const HeaderData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
}
`;

export const HeaderDateTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
}
`;

export const HeaderTitle = styled.h2`
  margin: 0
`;

