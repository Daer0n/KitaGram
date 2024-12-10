import React from 'react';
import { DatePicker, TimePicker, Typography } from 'antd';
import moment from 'moment';
import { Container, Picker } from './styled';

const { Title, Text } = Typography;

interface DateTimeSelectorProps {
    selectedDate: moment.Moment | null;
    selectedTime: moment.Moment | null;
    onDateChange: (date: moment.Moment | null) => void;
    onTimeChange: (time: moment.Moment | null) => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
    selectedDate,
    selectedTime,
    onDateChange,
    onTimeChange,
}) => {
    return (
        <Container>
            <Picker>
                <Title level={4}>Выберите дату</Title>
                <DatePicker value={selectedDate} onChange={onDateChange} format="DD.MM.YYYY" />
            </Picker>
            <Picker>
                <Text>Начало: </Text>
                <TimePicker value={selectedTime} onChange={onTimeChange} format="HH:mm" />
            </Picker>
        </Container>
    );
};
