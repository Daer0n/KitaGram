import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Upload, Modal, Select, Row, Col } from 'antd';
import { RoomsAPI } from '@api';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { UploadOutlined } from '@ant-design/icons';
import { ImagePreview } from './styled';
import { Tag } from '@types';

interface Room {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    tags: number[];
    date: string;
    time: string;
    participants: number;
    category: string;
    participantsLimit: number;
    isUserInRoom: boolean;
    location: string;
}

interface RoomEditProps {
    room: Room;
    visible: boolean;
    onClose: () => void;
    onUpdateRoom: (updatedRoom: Room) => void;
}

const categories = [
    { id: 1, name: 'Спорт' },
    { id: 2, name: 'Еда & Напитки' },
    { id: 3, name: 'Искусство & Культура' },
    { id: 4, name: 'Наука & Технологии' },
    { id: 5, name: 'Природа' },
    { id: 6, name: 'Настольные игры' },
];

const RoomEdit: React.FC<RoomEditProps> = ({ room, visible, onClose, onUpdateRoom }) => {
    const [form] = Form.useForm();
    const [coordinates, setCoordinates] = useState<number[]>([53.9045, 27.559]);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await RoomsAPI.tags();
            setTags(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (room && room.location) {
            try {
                const parsedLocation = JSON.parse(room.location);
                console.log(parsedLocation);
                setCoordinates(parsedLocation);
            } catch (error) {
                console.error('Ошибка при парсинге местоположения:', error);
            }
        }

        form.setFieldsValue({
            name: room.name,
            description: room.description,
            imageUrl: room.imageUrl,
            category: room.category,
            participantsLimit: room.participantsLimit,
        });
    }, [room, form]);

    const handleSave = async (values: any) => {
        try {
            notification.success({
                message: 'Комната успешно обновлена!',
            });
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении комнаты:', error);
            notification.error({
                message: 'Ошибка при обновлении комнаты',
            });
        }
    };

    const handleMapClick = (event: any) => {
        const coords = event.get('coords');
        setCoordinates(coords);
        form.setFieldsValue({ location: JSON.stringify(coords) });
    };

    return (
        <Modal
            title="Редактировать комнату"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={1100}
        >
            <Row gutter={16}>
                <Col span={8}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSave}
                        style={{ padding: '20px' }}
                    >
                        <Form.Item
                            label="Название комнаты"
                            name="name"
                            rules={[{ required: true, message: 'Введите название комнаты!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Описание комнаты"
                            name="description"
                            rules={[{ required: true, message: 'Введите описание комнаты!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Категория комнаты"
                            name="category"
                            rules={[{ required: true, message: 'Выберите категорию!' }]}
                        >
                            <Select placeholder="Выберите категорию">
                                {categories.map((category) => (
                                    <Select.Option key={category.id} value={category.name}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Количество участников"
                            name="participantsLimit"
                            rules={[{ required: true, message: 'Введите количество участников!' }]}
                        >
                            <Input type="number" min={1} />
                        </Form.Item>

                        <Form.Item label="Загрузить изображение">
                            <Upload beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Выберите файл</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '10px' }}
                            >
                                Сохранить
                            </Button>
                            <Button onClick={onClose}>Отменить</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={16}>
                    <ImagePreview
                        src={form.getFieldValue('imageUrl') || room.imageUrl}
                        alt="Room Preview"
                        style={{ width: '600px', height: '400px' }}
                    />

                    <YMaps>
                        <Map
                            defaultState={{ center: coordinates, zoom: 9 }}
                            style={{ width: '600px', height: '400px', marginTop: '50px' }}
                            onClick={handleMapClick}
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
                </Col>
            </Row>
        </Modal>
    );
};

export { RoomEdit };
