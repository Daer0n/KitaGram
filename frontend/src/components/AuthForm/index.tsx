import { useState } from 'react';
import KitaGram from '@assets/images/KitaGram.svg';
import { useFetching } from '@hooks';
import { Loader } from '@components/Loader';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import Cookies from 'js-cookie';
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
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const data = await API.signIn({ nickname, password });
            if (!data.userID) {
                throw new Error(data.message);
            }

            Cookies.set('access_token', data.access_token, { expires: 7 });
            Cookies.set('refresh_token', data.refresh_token, { expires: 7 });
            Cookies.set('userID', data.userID, { expires: 7 });

            navigate('/home');
        } catch (err) {
            notification.error({
                message: 'Ошибка входа',
                description: 'Пожалуйста, проверьте ваши учетные данные.',
            });
        }
    });

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
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
                    <Input placeholder="Никнейм" onChange={handleNicknameChange} value={nickname} />
                </InputContainer>

                <InputContainer>
                    <Input
                        type="password"
                        placeholder="Пароль"
                        onChange={handlePasswordChange}
                        value={password}
                    />
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
