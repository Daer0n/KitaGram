import Logo from '@assets/images/Logo.svg';
import Rooms from '@assets/images/Rooms.svg';
import Options from '@assets/images/Options.svg';
import Home from '@assets/images/Home.svg';
import NewRoom from '@assets/images/NewRoom.svg';
import { useNavigate } from 'react-router-dom';
import { Container, Icon, IconContainer, LogoContainer } from './styled';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <LogoContainer onClick={() => navigate('/home')}>
                <img src={Logo} alt="Home" />
            </LogoContainer>

            <IconContainer>
                <Icon onClick={() => navigate('/home')}>
                    <img src={Home} alt="Home" />
                </Icon>

                <Icon onClick={() => navigate('/create-room')}>
                    <img src={NewRoom} alt="NewRoom" />
                </Icon>
                <Icon>
                    <img src={Rooms} alt="Rooms" />
                </Icon>

                <Icon onClick={() => navigate('/options')}>
                    <img src={Options} alt="Options" />
                </Icon>
            </IconContainer>
        </Container>
    );
};
