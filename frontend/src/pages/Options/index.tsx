import { Header } from '@components/Header';
import { Container, Content } from './styled';
import { Footer } from '@components/Footer';
import { OptionsForm } from '@components/OptionsForm';

export const Options = () => {
    return (
        <Container>
            <Header />

            <Content>
                <OptionsForm />
            </Content>

            <Footer />
        </Container>
    );
};
