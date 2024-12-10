import React from 'react';
import { InputNumber } from 'antd';
import { Container } from './styled';

interface MemberSelectorProps {
    members: number;
    onChange: (value: number) => void;
}

export const MemberSelector: React.FC<MemberSelectorProps> = ({ members, onChange }) => {
    return (
        <Container>
            До
            <InputNumber
                value={members}
                onChange={onChange}
                min={1}
                max={20}
                style={{ fontSize: '20px' }}
            />
            пользователей
        </Container>
    );
};
