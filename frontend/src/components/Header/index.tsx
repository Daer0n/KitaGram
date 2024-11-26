import Logo from '@assets/images/Logo.svg';
import Rooms from '@assets/images/Rooms.svg';
import Options from '@assets/images/Options.svg';
import Home from '@assets/images/Home.svg';
import NewRoom from '@assets/images/NewRoom.svg';
import { Container, Icon, IconContainer, LogoContainer } from './styled';

export const Header = () => {
    return (
        <Container>
            <LogoContainer>
                <img src={Logo} alt="Home" />
            </LogoContainer>

            <IconContainer>
                <Icon>
                    <img src={Home} alt="Home" />
                </Icon>

                <Icon>
                    <img src={NewRoom} alt="NewRoom" />
                </Icon>
                <Icon>
                    <img src={Rooms} alt="Rooms" />
                </Icon>

                <Icon>
                    <img src={Options} alt="Options" />
                </Icon>
            </IconContainer>
        </Container>
    );
};
