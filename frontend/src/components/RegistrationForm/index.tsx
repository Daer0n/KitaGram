import { useState } from 'react';
import KitaGram from '@assets/images/KitaGram.svg';
import { useFetching } from '@hooks';
import { Loader } from '@components/Loader';
import BackIcon from '@assets/images/BackIcon.svg';
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

export const RegistrationForm = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const navigate = useNavigate();
    const [fetchData, isLoading, error] = useFetching(async () => {
        setTimeout(() => console.log('Jood jobski'), 3000);
    });

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
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
                    <Input placeholder="Имя" onChange={handleNameChange} value={name} />
                </InputContainer>

                <InputContainer>
                    <Input placeholder="Фамилия" onChange={handleSurnameChange} value={surname} />
                </InputContainer>

                <InputContainer>
                    <Input placeholder="Почта" onChange={handleMailChange} value={mail} />
                </InputContainer>

                <InputContainer>
                    <Input placeholder="Пароль" onChange={handlePasswordChange} value={password} />
                </InputContainer>

                {isLoading && <Loader />}

                <Button onClick={fetchData}>Регистрация</Button>
            </Content>
        </Container>
    );
};
