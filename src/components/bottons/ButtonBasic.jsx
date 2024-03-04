import PropTypes from 'prop-types';
import { IconButton, styled } from '@mui/material';
import Icon from '@mui/material/Icon';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '0.8em', // Utilizando em para hacerlo relativo
    padding: '0.6em 1.6em', // Utilizando em para hacerlo relativo
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.5em',
    color: theme.palette.secondary.main,
    fontSize: '0.9em', // Tamaño de fuente relativo
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

const ButtonBasic = ({ icon, color, text, onClick }) => {
    return (
        <StyledIconButton color={color} onClick={onClick}>
            {/*<Icon>{icon}</Icon>*/}
            {/*Comento porque no me gusta como queda con el icon*/}
            {text}
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
