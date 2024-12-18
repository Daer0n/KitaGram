import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Upload, Modal, Select, Row, Col } from 'antd';
import { RoomsAPI } from '@api';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { UploadOutlined } from '@ant-design/icons';
import { ImagePreview } from './styled';
import { Tag } from '@types';
import { DateTimeSelector } from '@components/DateTimeSelector';

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
    onUpdateRoom: () => void;
    onDeleteRoom: () => void;
}

const categories = [
    { id: 1, name: 'Спорт' },
    { id: 2, name: 'Еда & Напитки' },
    { id: 3, name: 'Искусство & Культура' },
    { id: 4, name: 'Наука & Технологии' },
    { id: 5, name: 'Природа' },
    { id: 6, name: 'Настольные игры' },
];

const RoomEdit: React.FC<RoomEditProps> = ({ room, visible, onClose, onUpdateRoom, onDeleteRoom }) => {
    const [form] = Form.useForm();
    const [coordinates, setCoordinates] = useState<number[]>([53.9045, 27.559]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [dateTime, setDateTime] = useState<string>('');
    const [fileList, setFileList] = useState<File[]>([]);

    useEffect(() => {
        setDateTime(room.date + room.time);
    }, [room]);

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
            participants_limit: room.participantsLimit,
            tags: room.tags.map((tag: any) => tag.id),
        });

        setSelectedTags(room.tags.map((tag: any) => tag.id));

        setDateTime(room.date);
    }, [room, form]);

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList.map((file) => file.originFileObj));
    };

    const handleSave = async (values: any) => {
        try {
            let imageUrl: string = room.imageUrl;
            if (fileList.length > 0) {
                const data = await RoomsAPI.uploadPhoto(fileList[0]);
                imageUrl = data.url;
            }

            const updatedRoom = {
                ...values,
                image_url: imageUrl,
                tags: selectedTags,
                date: dateTime,
                location: JSON.stringify(coordinates),
            };

            await RoomsAPI.updateRoom(room.id, updatedRoom);
            notification.success({
                message: 'Комната успешно обновлена!',
            });
            onUpdateRoom();
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении комнаты:', error);
            notification.error({
                message: 'Ошибка при обновлении комнаты',
                description: error.message || 'Произошла ошибка',
            });
        }
    };

    const handleMapClick = (event: any) => {
        const coords = event.get('coords');
        setCoordinates(coords);
        form.setFieldsValue({ location: JSON.stringify(coords) });
    };

    const handleDeleteRoom = async () => {
        try {
            const response = await RoomsAPI.deleteRoom(room.id);
            if (response && response.status === 204) {
                notification.success({
                    message: 'Комната успешно удалена!',
                });
                onDeleteRoom();
                onClose();
            } else {
                throw new Error('Не удалось удалить комнату');
            }
        } catch (error) {
            console.error('Ошибка при удалении комнаты:', error);
            notification.error({
                message: 'Ошибка при удалении комнаты',
                description: error.message || 'Произошла ошибка',
            });
        }
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
                            name="participants_limit"
                            rules={[{ required: true, message: 'Введите количество участников!' }]}
                        >
                            <Input type="number" min={1} />
                        </Form.Item>

                        <Form.Item label="Дата и время" style={{ width: '100%' }}>
                            <DateTimeSelector
                                dateTime={dateTime}
                                setDateTime={setDateTime}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item label="Теги" name="tags">
                            <Select
                                mode="multiple"
                                placeholder="Выберите теги"
                                value={selectedTags}
                                onChange={(value) => {
                                    setSelectedTags(value);
                                    form.setFieldsValue({ tags: value });
                                }}
                            >
                                {tags.map((tag) => (
                                    <Select.Option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Загрузить изображение">
                            <Upload
                                beforeUpload={() => false}
                                onChange={handleUploadChange}
                                fileList={fileList.map((file) => ({
                                    uid: file.name,
                                    name: file.name,
                                    status: 'done',
                                    originFileObj: file,
                                }))}
                                maxCount={1}
                            >
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
                            <Button
                                onClick={handleDeleteRoom}
                                style={{
                                    backgroundColor: '#ff5c5c',
                                    color: '#fff',
                                    border: 'none',
                                }}
                            >
                                Удалить комнату
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={16}>
                    <ImagePreview
                        src={room.imageUrl}
                        alt="Room Preview"
                        style={{ width: '600px', height: '400px' }}
                    />

                    <YMaps>
                        <Map
                            defaultState={{ center: coordinates, zoom: 9 }}
                            style={{ width: '600px', height: '350px', marginTop: '20px' }}
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
