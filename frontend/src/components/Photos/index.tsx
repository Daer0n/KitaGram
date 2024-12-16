import React, { useState } from 'react';
import { Container, Photo, AddPhoto } from './styled';
import { RoomsAPI } from '@api';

interface PhotosProps {
    setPhoto: (photos: string) => void;
}

export const Photos: React.FC<PhotosProps> = ({ setPhoto }) => {
    const [roomPhoto, setRoomPhoto] = useState<string>('');

    const handleAddPhoto = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    if (loadEvent.target?.result) {
                        setRoomPhoto(loadEvent.target.result as string);
                    }
                };
                reader.readAsDataURL(file);

                try {
                    const data = await RoomsAPI.uploadPhoto(file);
                    const url = data.url;
                    setPhoto(url);
                } catch (error) {
                    console.error('Error uploading photo:', error);
                }
            }
        };
        input.click();
    };

    return (
        <Container>
            {!roomPhoto ? (
                <AddPhoto onClick={handleAddPhoto}>
                    <span>+</span>
                </AddPhoto>
            ) : (
                <Photo onClick={handleAddPhoto}>
                    <img src={roomPhoto} alt="Uploaded" />
                </Photo>
            )}
        </Container>
    );
};
