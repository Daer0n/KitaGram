import { useState } from 'react';
import KitaGram from '@assets/images/KitaGram.svg';
import { useFetching } from '@hooks';
import { Loader } from '@components/Loader';
import BackIcon from '@assets/images/BackIcon.svg';
import { notification } from 'antd';
import { UserAPI } from '@api';
import {
    Container,
    Content,
    Input,
    InputContainer,
    LogoContainer,
    Button,
    BackButton,
} from './styled';
import { useNavigate } from 'react-router-dom';
import { User } from '@types';

export const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const user: User = { email, nickname, password };
            const data = await UserAPI.signUp(user);

            notification.success({
                message: 'Регистрация успешна',
                description: 'Вы успешно зарегистрированы! Перейдите к аутентификации.',
            });
        } catch (err) {
            notification.error({
                message: 'Ошибка регистрации',
                description: 'Данный пользователь существует',
            });
        }
    });

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <Container>
            <Content>
                <BackButton onClick={handleBackClick}>
                    <img src={BackIcon} alt="Назад" />
                </BackButton>
                <LogoContainer>
                    <img src={KitaGram} alt="Логотип" />
                </LogoContainer>

                <InputContainer>
                    <Input placeholder="Никнейм" onChange={handleNicknameChange} value={nickname} />
                </InputContainer>

                <InputContainer>
                    <Input placeholder="Почта" onChange={handleMailChange} value={email} />
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

                <Button onClick={fetchData}>Регистрация</Button>
            </Content>
        </Container>
    );
};
