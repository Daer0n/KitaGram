import { Header } from '@components/Header';
import { Container, Content } from './styled';
import { Footer } from '@components/Footer';
import { AccountForm } from '@components/AccountForm';

export const Account = () => {
    return (
        <Container>
            <Header />

            <Content>
                <AccountForm />
            </Content>

            <Footer />
        </Container>
    );
};
