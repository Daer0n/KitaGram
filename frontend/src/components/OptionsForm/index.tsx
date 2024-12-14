import Arrow from '@assets/images/Arrow.svg';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import {
    Container,
    Content,
    Description,
    Info,
    Section,
    SectionElement,
    Avatar,
    Button,
} from './styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserAPI } from '@api';

export const OptionsForm = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string>(DefaultAvatar);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await UserAPI.getInfo();

                if (data.img_path !== 'https://example.com') {
                    setPhoto(data.img_path);
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Content>
                <Info>
                    <Avatar>
                        <img src={photo} alt="avatar" />
                    </Avatar>
                </Info>

                <Section>
                    <Description>Настройки</Description>

                    <SectionElement onClick={() => navigate('/options/account')}>
                        Аккаунт
                        <img src={Arrow} alt="" />
                    </SectionElement>

                    <SectionElement>
                        Уведомления
                        <img src={Arrow} alt="" />
                    </SectionElement>
                </Section>

                <Section>
                    <Description>Информация</Description>

                    <SectionElement>
                        Конфиденциальность
                        <img src={Arrow} alt="" />
                    </SectionElement>

                    <SectionElement>
                        Обратная связь
                        <img src={Arrow} alt="" />
                    </SectionElement>

                    <SectionElement>
                        Оценить KitaGram
                        <img src={Arrow} alt="" />
                    </SectionElement>

                    <SectionElement>
                        Поделиться приложением
                        <img src={Arrow} alt="" />
                    </SectionElement>
                </Section>

                <Button onClick={() => navigate('/')}>Выйти из аккаунта</Button>
            </Content>
        </Container>
    );
};
