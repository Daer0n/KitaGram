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

export const OptionsForm = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Content>
                <Info>
                    <Avatar>
                        <img src={DefaultAvatar} alt="default avatar" />
                    </Avatar>
                </Info>

                <Section>
                    <Description>Настройки</Description>

                    <SectionElement>
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
