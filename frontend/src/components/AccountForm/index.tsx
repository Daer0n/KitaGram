import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import { useState, useEffect } from 'react';
import { UserAPI } from '@api';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackIcon from '@assets/images/BackIcon.svg';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useFetching } from '@hooks';
import {
    Container,
    Content,
    Info,
    Avatar,
    Button,
    SectionElement,
    Description,
    Modal,
    AvatarWrapper,
    BackButton,
} from './styled';
import { Loader } from '@components/Loader';

export const AccountForm = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string>(DefaultAvatar);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formType, setFormType] = useState<'username' | 'email' | 'password'>('username');
    const [newValue, setNewValue] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fetchData, isLoading] = useFetching(async () => {
        try {
            const data = await UserAPI.getInfo();
            if (data.img_path !== 'https://example.com') {
                setPhoto(data.img_path);
            }
            setEmail(data.email);
            setUsername(data.username);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddPhoto = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    if (loadEvent.target?.result) {
                        setPhoto(loadEvent.target.result as string);
                    }
                };
                reader.readAsDataURL(file);
                await UserAPI.uploadPhoto(file);
            }
        };
        input.click();
    };

    const handleDeleteUser = async () => {
        try {
            await UserAPI.deleteUser();
            notification.success({
                message: 'Успешно',
                description: 'Ваш аккаунт успешно удалён.',
                placement: 'topRight',
            });
            navigate('/');
        } catch (error) {
            notification.error({
                message: 'Ошибка',
                description: 'Не удалось удалить аккаунт. Попробуйте еще раз.',
                placement: 'topRight',
            });
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    const showModal = (type: 'username' | 'email' | 'password') => {
        setFormType(type);
        setIsModalVisible(true);
        setNewValue(type === 'username' ? username : type === 'email' ? email : '');
        setOldPassword('');
        setConfirmPassword('');
    };

    const handleModalOk = async () => {
        try {
            if (formType === 'username') {
                setUsername(newValue);
                await UserAPI.updateUsername(newValue);
            } else if (formType === 'email') {
                setEmail(newValue);
                await UserAPI.updateEmail(newValue);
            } else if (formType === 'password') {
                if (newValue !== confirmPassword) {
                    throw new Error('Пароли не совпадают');
                }
            }
            notification.success({
                message: 'Успешно',
                description: `Ваш ${formType === 'username' ? 'никнейм' : formType === 'email' ? 'email' : 'пароль'} успешно обновлён.`,
                placement: 'topRight',
            });
            setIsModalVisible(false);
        } catch (error) {
            notification.error({
                message: 'Ошибка',
                description: `Не удалось обновить ${formType === 'username' ? 'никнейм' : formType === 'email' ? 'email' : 'пароль'}. ${error.message}`,
                placement: 'topRight',
            });
            console.error('Ошибка при обновлении:', error);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleNavigateBack = () => {
        navigate('/options');
    };

    return (
        <Container>
            {isLoading ? (
                <Loader />
            ) : (
                <Content>
                    <BackButton onClick={handleNavigateBack}>
                        <img src={BackIcon} alt="Назад" />
                    </BackButton>

                    <Info>
                        <AvatarWrapper onClick={handleAddPhoto}>
                            <Avatar>
                                <img src={photo} alt="avatar" />
                            </Avatar>

                            <div className="edit-icon">
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                        </AvatarWrapper>
                    </Info>

                    <SectionElement onClick={() => showModal('username')}>
                        Никнейм
                        <Description>{username}</Description>
                    </SectionElement>

                    <SectionElement onClick={() => showModal('email')}>
                        Почта
                        <Description>{email}</Description>
                    </SectionElement>

                    <SectionElement onClick={() => showModal('password')}>
                        Сменить пароль
                    </SectionElement>

                    <Button onClick={handleDeleteUser}>Удалить аккаунт</Button>
                </Content>
            )}

            <Modal
                title={
                    formType === 'username'
                        ? 'Смена никнейма'
                        : formType === 'email'
                          ? 'Смена почты'
                          : 'Смена пароля'
                }
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Сохранить"
                cancelText="Отмена"
            >
                {formType === 'password' ? (
                    <>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Введите старый пароль"
                        />
                        <input
                            type="password"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder="Введите новый пароль"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Повторите новый пароль"
                        />
                    </>
                ) : (
                    <input
                        type={formType === 'email' ? 'email' : 'text'}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder={
                            formType === 'username'
                                ? 'Введите новый никнейм'
                                : 'Введите новый email'
                        }
                    />
                )}
            </Modal>
        </Container>
    );
};
