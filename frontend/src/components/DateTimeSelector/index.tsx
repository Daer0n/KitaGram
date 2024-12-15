import React, { useEffect } from 'react';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Container, Picker } from './styled';

interface DateTimeSelectorProps {
    dateTime: string;
    setDateTime: (dateTime: string) => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ dateTime, setDateTime }) => {
    useEffect(() => {
        dayjs.locale('ru');
    }, []);

    const currentDateTime = dateTime ? dayjs(dateTime) : null;

    const updateDateTime = (newDate: dayjs.Dayjs | null, newTime: dayjs.Dayjs | null) => {
        if (newDate && newTime) {
            const combinedDateTime = newDate.hour(newTime.hour()).minute(newTime.minute());
            setDateTime(combinedDateTime.format('YYYY-MM-DDTHH:mm'));
        } else if (newDate) {
            setDateTime(newDate.format('YYYY-MM-DDTHH:mm'));
        } else if (newTime) {
            setDateTime(newTime.format('YYYY-MM-DDTHH:mm'));
        }
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        const currentTime = currentDateTime ? currentDateTime : dayjs();
        updateDateTime(date, currentTime);
    };

    const handleTimeChange = (time: dayjs.Dayjs | null) => {
        const currentDate = currentDateTime ? currentDateTime : dayjs();
        updateDateTime(currentDate, time);
    };

    return (
        <Container>
            <Picker>
                <DatePicker
                    value={currentDateTime}
                    onChange={handleDateChange}
                    placeholder="Выберите дату"
                    format="D MMMM"
                    style={{ width: '100%' }}
                />
            </Picker>
            <Picker>
                <TimePicker
                    value={currentDateTime}
                    onChange={handleTimeChange}
                    placeholder="Выберите время"
                    format="HH:mm"
                    style={{ width: '100%' }}
                />
            </Picker>
        </Container>
    );
};
