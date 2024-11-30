// Home.tsx
import { Container } from './styled'; // Styled Container
import { Header } from '@components/Header'; // Assuming Header component is in @components/Headerim
import { RoomList } from '@components/RoomList';

export const Home = () => {
  return (
    <Container>
      {/* Header Component */}
      <Header />
      
      {/* Rooms List Component */}
      <RoomList />
    </Container>
  );
};
