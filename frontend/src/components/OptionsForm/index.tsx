import Arrow from '@assets/images/Arrow.svg';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetching } from '@hooks';
import { UserAPI } from '@api';
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
import { Loader } from '@components/Loader';

export const OptionsForm = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string>(DefaultAvatar);
    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const data = await UserAPI.getInfo();

            if (data.img_path !== 'https://example.com/') {
                setPhoto(data.img_path);
                console.log("Yes")
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    console.log(photo);

    return (
        <Container>
            {isLoading ? (
                <Loader />
            ) : (
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
            )}
        </Container>
    );
};
