import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Upload, Modal, Select, Row, Col } from 'antd';
import { RoomsAPI } from '@api';
import { UploadOutlined } from '@ant-design/icons';
import { ImagePreview } from './styled';

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

    useEffect(() => {
        form.setFieldsValue({
            name: room.name,
            description: room.description,
            imageUrl: room.imageUrl,
            category: room.category,
            participants: room.participants,
            participantsLimit: room.participantsLimit,
        });
    }, [room, form]);

    const handleSave = async (values: any) => {
        try {
            // Uncomment this line to implement the update logic
            // const updatedRoom = await RoomsAPI.updateRoom(room.id, {
            //     name: values.name,
            //     description: values.description,
            //     imageUrl: values.imageUrl,
            //     category: values.category,
            //     participants: values.participants,
            //     participantsLimit: values.participantsLimit,
            //     tags: room.tags, // Assuming tags are unchanged
            // });
            notification.success({
                message: 'Комната успешно обновлена!',
            });
            // onUpdateRoom(updatedRoom);
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении комнаты:', error);
            notification.error({
                message: 'Ошибка при обновлении комнаты',
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
                            name="participants"
                            rules={[{ required: true, message: 'Введите количество участников!' }]}
                        >
                            <Input type="number" min={0} />
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
                </Col>
            </Row>
        </Modal>
    );
};

export { RoomEdit };
