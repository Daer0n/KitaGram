import React from 'react';
import { Container, Photo, AddPhoto } from './styled';

interface PhotosProps {
    photos: string[];
    setPhotos: (photos: string[]) => void;
}

export const Photos: React.FC<PhotosProps> = ({ photos, setPhotos }) => {
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
            {photos.map((photo, index) => (
                <Photo key={index}>
                    <img src={photo} alt={`Uploaded ${index + 1}`} />
                </Photo>
            ))}
            <AddPhoto onClick={handleAddPhoto}>
                <span>+</span>
            </AddPhoto>
        </Container>
    );
};
