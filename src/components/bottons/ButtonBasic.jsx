import PropTypes from 'prop-types';
import { IconButton, styled } from '@mui/material';
import Icon from '@mui/material/Icon';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '0.8em', // Utilizando em para hacerlo relativo
    fontSize: '0.9em', // Tamaño de fuente relativo
    padding: '0.6em 1.6em', // Utilizando em para hacerlo relativo
    margin:'1em',

    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    },
    [theme.breakpoints.down('sm')]: { // Estilos responsivos para pantallas pequeñas
        borderRadius: '0.5em',
        padding: '1.4em 0.8em',
        fontSize: '0.8em',
    },
}));
const ButtonTextContainer = styled('div')({
    marginLeft: '0.5em', // Agregar espacio entre el ícono y el texto
});

const ButtonBasic = ({ icon, color, text, onClick }) => {
    return (
        <StyledIconButton color={color} onClick={onClick}>
            {icon}
            <ButtonTextContainer>{text}</ButtonTextContainer>
        </StyledIconButton>
    );
};

ButtonBasic.propTypes = {
    icon: PropTypes.node,
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ButtonBasic;
