import Logo from '@assets/images/Logo.svg';
import Rooms from '@assets/images/Rooms.svg';
import Options from '@assets/images/Options.svg';
import Home from '@assets/images/Home.svg';
import NewRoom from '@assets/images/NewRoom.svg';
import RoomsPick from '@assets/images/RoomsPick.svg';
import OptionsPick from '@assets/images/OptionsPick.svg';
import HomePick from '@assets/images/HomePick.svg';
import NewRoomPick from '@assets/images/NewRoomPick.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Icon, IconContainer, LogoContainer } from './styled';

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getIcon = (path: string, defaultIcon: string, pickedIcon: string) => {
        return location.pathname === path ? pickedIcon : defaultIcon;
    };

    return (
        <Container>
            <LogoContainer onClick={() => navigate('/home')}>
                <img src={Logo} alt="Home" />
            </LogoContainer>

            <IconContainer>
                <Icon onClick={() => navigate('/home')}>
                    <img src={getIcon('/home', Home, HomePick)} alt="Home" />
                </Icon>

                <Icon onClick={() => navigate('/create-room')}>
                    <img src={getIcon('/create-room', NewRoom, NewRoomPick)} alt="New Room" />
                </Icon>

                <Icon onClick={() => navigate('/rooms/my')}>
                    <img src={getIcon('/rooms/my', Rooms, RoomsPick)} alt="Rooms" />
                </Icon>

                <Icon onClick={() => navigate('/options')}>
                    <img src={getIcon('/options', Options, OptionsPick)} alt="Options" />
                </Icon>
            </IconContainer>
        </Container>
    );
};
