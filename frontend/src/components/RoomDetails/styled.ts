import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  background-color: #f0f0f0;
`;

export const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

export const ContentContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeaderData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Category = styled.div`
  font-size: 16px;
  color: #777;
  text-transform: uppercase;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  color: #777;
  font-weight: 600;
  text-transform: uppercase;
`

export const DescriptionContainer = styled.div`
  margin: 10px 0;
`


export const Description = styled.div`
  font-size: 16px;
  color: #777;
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 1.8em;
  color: #333;
`;

export const DateTime = styled.div`
  font-size: 14px;
  color: #555;
`;

export const HeaderLocation = styled.div`
  flex: 1;
  padding-bottom: 20px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

export const Tag = styled.div`
  background-color: #ff5c5c;
  color: white;
  border-radius: 12px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e63939;
  }
`;

export const ParticipantsInfo = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #555;
`;

export const Avatars = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

export const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  height: min-content;
  justify-content: flex-start;
  gap: 10px;
`;

export const Button = styled.button<{ isLeaveButton?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${({ isLeaveButton }) => (isLeaveButton ? '#ff4d4f' : '#4caf50')};

  &:hover {
    background-color: ${({ isLeaveButton }) => (isLeaveButton ? '#ff7875' : '#45a049')};
  }
`;
