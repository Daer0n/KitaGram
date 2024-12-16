import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { MyRoomList } from '@components/MyRoomList';
import { Container, Content } from './styled';

export const MyRooms = () => {
    return (
        <Container>
            <Header />

            <Content>
                <MyRoomList />
            </Content>

            <Footer />
        </Container>
    );
};
