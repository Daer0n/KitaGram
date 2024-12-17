import { useEffect, useState } from 'react';
import { MemberSelector } from '@components/MemberSelector';
import { DateTimeSelector } from '@components/DateTimeSelector';
import BackIcon from '@assets/images/BackIcon.svg';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Room, Tag } from '@types';
import { notification } from 'antd';
import { RoomsAPI } from '@api';
import { Tags } from '@components/Tags';
import { Photos } from '@components/Photos';
import { Categories } from '@components/Categories';
import {
    Block,
    Container,
    Content,
    Description,
    Input,
    Title,
    NextButton,
    BackButton,
    Textarea,
} from './styled';

export const CreateRoomForm = () => {
    const [step, setStep] = useState(0);
    const [roomName, setRoomName] = useState('');
    const [photo, setPhoto] = useState<string>('');
    const [members, setMembers] = useState(1);
    const [date, setDate] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [coordinates, setCoordinates] = useState([53.9045, 27.559]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await RoomsAPI.tags();
            setTags(data);
        };

        fetchData();
    }, []);

    const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleMapClick = (event) => {
        const coords = event.get('coords');
        setCoordinates(coords);
    };

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const previousStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleCreateRoom = async () => {
        const room: Room = {
            name: roomName,
            description: description,
            image_url: photo,
            category: selectedCategory,
            tags: selectedTags,
            datetime: date,
            location: JSON.stringify(coordinates),
            participants_limit: members,
        };
        try {
            const data = await RoomsAPI.createRoom(room);
            notification.success({
                message: 'Комната успешно создана!',
                description: 'Вы можете теперь управлять этой комнатой.',
            });
        } catch (error) {
            notification.error({
                message: 'Ошибка при создании комнаты',
                description: 'Пожалуйста, попробуйте еще раз.',
            });
            console.error('Error creating room:', error);
        }
    };

    return (
        <Container>
            <Title>Новая комната</Title>
            <Content>
                <BackButton onClick={previousStep} disabled={step === 0}>
                    <img src={BackIcon} alt="Назад" />
                </BackButton>

                {step === 0 && (
                    <Block>
                        <Description>Как будет называться ваша комната?</Description>
                        <Input
                            placeholder="Введите название"
                            value={roomName}
                            onChange={handleChangeRoomName}
                        />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 1 && (
                    <Block>
                        <Description>Введите описание комнаты</Description>
                        <Textarea
                            placeholder="Введите описание"
                            value={description}
                            onChange={handleChangeDescription}
                        />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 2 && (
                    <Block>
                        <Description>Выберите локацию</Description>
                        <YMaps>
                            <Map
                                defaultState={{ center: coordinates, zoom: 9 }}
                                style={{ width: '100%', height: '400px' }}
                                onClick={handleMapClick} // Set click event handler
                            >
                                <Placemark
                                    geometry={coordinates}
                                    options={{
                                        preset: 'islands#icon',
                                        iconColor: '#0095b6',
                                    }}
                                />
                            </Map>
                        </YMaps>
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 3 && (
                    <Block>
                        <Description>Установите максимально количество приглашенных</Description>
                        <MemberSelector members={members} onChange={setMembers} />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 4 && (
                    <Block>
                        <Description>Добавьте фотографию</Description>
                        <Photos setPhoto={setPhoto} />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 5 && (
                    <Block>
                        <Description>Выберите дату и время</Description>
                        <DateTimeSelector dateTime={date} setDateTime={setDate} />
                        <NextButton onClick={nextStep}>Готово</NextButton>
                    </Block>
                )}
                {step === 6 && (
                    <Block>
                        <Description>Выберите категорию</Description>
                        <Categories
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}
                {step === 7 && (
                    <Block>
                        <Description>Выберите теги</Description>
                        <Tags
                            tags={tags}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />
                        <NextButton onClick={handleCreateRoom}>Создать комнату</NextButton>
                    </Block>
                )}
            </Content>
        </Container>
    );
};
