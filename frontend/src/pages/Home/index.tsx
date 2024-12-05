
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { RoomList } from '@components/RoomList';
import { Container, Content } from './styled';

export const Home = () => {
    return (
        <Container>
            <Header />
            
            <Content><RoomList /></Content>

            <Footer />
        </Container>
    );
};
