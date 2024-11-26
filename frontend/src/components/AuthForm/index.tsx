import { useState } from 'react';
import KitaGram from '@assets/images/KitaGram.svg';
import { useFetching } from '@hooks';
import { Loader } from '@components/Loader';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { API } from '@api';
import {
    Container,
    Content,
    InputContainer,
    Title,
    Input,
    LogoContainer,
    Button,
    RegistrationContainer,
    Registration,
} from './styled';

export const AuthForm = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [fetchData, isLoading, error] = useFetching(async () => {
        try {
            const data = await API.logIn(mail, password);
            if (!data.user) {
                throw new Error('Пользователь не найден');
            }
            console.log(data);
        } catch (err) {
            notification.error({
                message: 'Ошибка входа',
                description: 'Пожалуйста, проверьте ваши учетные данные.',
            });
        }
    });

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <Container>
            <Content>
                <LogoContainer>
                    <img src={KitaGram} alt="Логотип" />
                </LogoContainer>

                <Title>Введите данные от аккаунта</Title>

                <InputContainer>
                    <Input placeholder="Почта" onChange={handleMailChange} value={mail} />
                </InputContainer>

                <InputContainer>
                    <Input placeholder="Пароль" onChange={handlePasswordChange} value={password} />
                </InputContainer>

                {isLoading && <Loader />}

                <Button onClick={fetchData}>Войти</Button>

                <RegistrationContainer>
                    Нет аккаунта?{' '}
                    <Registration onClick={() => navigate('/registration')}>
                        Регистрация
                    </Registration>
                </RegistrationContainer>
            </Content>
        </Container>
    );
};
