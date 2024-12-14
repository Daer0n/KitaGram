import { CreateRoomForm } from '@components/CreateRoomForm';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Container, Content } from './styled';

export const CreateRoom = () => {
    return (
        <Container>
            <Header />

            <Content>
                <CreateRoomForm />
            </Content>

            <Footer />
        </Container>
    );
};
