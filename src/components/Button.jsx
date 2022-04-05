import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() { // componente que recebe a lógica de excluir somente uma determinada carta do baralho, lógica tal recebida via props
    const { excluirCard } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-button"
        onClick={ excluirCard }
      >
        Excluir
      </button>
    );
  }
}

Button.propTypes = {
  excluirCard: PropTypes.func.isRequired,
};

export default Button;
