import PropTypes from 'prop-types';
import { IconButton, styled } from '@mui/material';

const FixedColorStyledIconButton = styled(IconButton)(({ theme }) => ({
    border: `2px solid `,
    borderRadius: '0.8em', // Utilizando em para hacerlo relativo
    fontSize: '0.9em', // Tamaño de fuente relativo
    padding: '0.6em 1.6em', // Utilizando em para hacerlo relativo
    margin: '1em',
    backgroundColor: '#6941C6', // Color de fondo fijo
    color: '#fff', // Color del texto fijo

    '&:hover': {
        backgroundColor: theme.palette.secondary.dark, // Cambio de color más oscuro en estado hover
        color: '#FFFFFF',
         // Efecto de sombra en estado hover
    },
}));

const ButtonTextContainer = styled('div')({
    marginLeft: '0.5em', // Agregar espacio entre el ícono y el texto
});

const BotonCrear = ({ icon, text, onClick, ...props }) => {
    return (
        <FixedColorStyledIconButton onClick={onClick} {...props}>
            {icon}
            <ButtonTextContainer>{text}</ButtonTextContainer>
        </FixedColorStyledIconButton>
    );
};

BotonCrear.propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default BotonCrear;
