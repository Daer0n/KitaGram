import { useEffect, useState } from 'react';
import { MemberSelector } from '@components/MemberSelector';
import { DateTimeSelector } from '@components/DateTimeSelector';
import BackIcon from '@assets/images/BackIcon.svg';
import { Tag, Category } from '@types';
import { API } from '@api';
import moment from 'moment';
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
} from './styled';

export const CreateRoomForm = () => {
    const [step, setStep] = useState(0);
    const [roomName, setRoomName] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [members, setMembers] = useState(1);
    const [date, setDate] = useState<moment.Moment | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [location, setLocation] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    };

    const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const previousStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await API.getTags();
            setTags(data);
            console.log(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await API.getCategories();
            setCategories(data);
            console.log(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await API.getOpenRooms();
            console.log(data);
        };

        fetchData();
    }, []);

    console.log(date);

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
                        <Description>Выберите локацию</Description>
                        <Input
                            placeholder="Введите локацию"
                            value={location}
                            onChange={handleChangeLocation}
                        />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 2 && (
                    <Block>
                        <Description>Установите максимально количество приглашенных</Description>
                        <MemberSelector members={members} onChange={setMembers} />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 3 && (
                    <Block>
                        <Description>Добавьте фотографии</Description>
                        <Photos photos={photos} setPhotos={setPhotos} />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}

                {step === 4 && (
                    <Block>
                        <Description>Выберите дату и время</Description>
                        <DateTimeSelector dateTime={date} setDateTime={setDate} />
                        <NextButton onClick={nextStep}>Готово</NextButton>
                    </Block>
                )}
                {step === 5 && (
                    <Block>
                        <Description>Выберите категорию</Description>
                        <Categories
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}
                {step === 6 && (
                    <Block>
                        <Description>Выберите теги</Description>
                        <Tags
                            tags={tags}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />
                        <NextButton onClick={nextStep}>Далее</NextButton>
                    </Block>
                )}
            </Content>
        </Container>
    );
};
