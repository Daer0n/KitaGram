import { useState } from 'react';
import { MemberSelector } from '@components/MemberSelector';
import { DateTimeSelector } from '@components/DateTimeSelector';
import {
    AddPhoto,
    Block,
    Container,
    Content,
    Description,
    Input,
    Photo,
    Photos,
    Title,
} from './styled';

export const CreateRoomForm = () => {
    const [roomName, setRoomName] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [members, setMembers] = useState(1);
    const [date, setDate] = useState<moment.Moment | null>(null);
    const [time, setTime] = useState<moment.Moment | null>(null);

    const handleDateChange = (date: moment.Moment | null) => {
        setDate(date);
    };

    const handleTimeChange = (time: moment.Moment | null) => {
        setTime(time);
    };

    const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(event?.target.value);
    };

    const handleAddPhoto = (event: React.MouseEvent) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    setPhotos((prevPhotos) => [...prevPhotos, loadEvent.target?.result as string]);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <Container>
            <Content>
                <Title>Новая комната</Title>

                <Block>
                    <Description>Как будет называться ваша комната?</Description>
                    <Input
                        placeholder="Введите название"
                        value={roomName}
                        onChange={handleChangeRoomName}
                    />
                </Block>

                <Block>
                    <Description>Добавьте фотографии</Description>
                    <Photos>
                        {photos.map((photo, index) => (
                            <Photo key={index}>
                                <img src={photo} alt={`Uploaded ${index + 1}`} />
                            </Photo>
                        ))}
                        <AddPhoto onClick={handleAddPhoto}>
                            <span>+</span>
                        </AddPhoto>
                    </Photos>
                </Block>

                <Block>
                    <Description>Установите максимально количество приглашенных</Description>
                    <MemberSelector members={members} onChange={setMembers}></MemberSelector>
                </Block>

                <Block>
                    <Description>Выберете локацию</Description>
                    <DateTimeSelector
                        selectedDate={date}
                        selectedTime={time}
                        onDateChange={handleDateChange}
                        onTimeChange={handleTimeChange}
                    />
                </Block>
            </Content>
        </Container>
    );
};
