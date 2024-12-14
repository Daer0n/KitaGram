import React, { useEffect } from 'react';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Container, Picker } from './styled';

interface DateTimeSelectorProps {
    dateTime: dayjs.Dayjs | null; 
    setDateTime: (dateTime: dayjs.Dayjs | null) => void; 
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ dateTime, setDateTime }) => {
    useEffect(() => {
        dayjs.locale('ru'); 
    }, []);

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (dateTime && date) {
            setDateTime(date.hour(dateTime.hour()).minute(dateTime.minute()));
        } else {
            setDateTime(date); 
        }
    };

    const handleTimeChange = (time: dayjs.Dayjs | null) => {
        if (dateTime && time) {
            setDateTime(time.minute(dateTime.minute()));
        } else {
            setDateTime(time);
        }
    };

    return (
        <Container>
            <Picker>
                <DatePicker
                    value={dateTime}
                    onChange={handleDateChange}
                    placeholder="Выберите дату"
                    format="D MMMM"
                    style={{ width: '100%' }}
                />
            </Picker>
            <Picker>
                <TimePicker
                    value={dateTime}
                    onChange={handleTimeChange}
                    placeholder="Выберите время"
                    format="HH:mm"
                    style={{ width: '100%' }}
                />
            </Picker>
        </Container>
    );
};
