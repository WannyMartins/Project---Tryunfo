import PropTypes from 'prop-types';
import React from 'react';
// import './form.css';

class Form extends React.Component {
  render() { // o Form recebe do App todas as props necessarias e cria as tags para conforme funcionalidades;
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled, onInputChange,
      onSaveButtonClick } = this.props;
    return (
      <form className="form">
        <label htmlFor="cardName">
          Nome da Carta:
          <input
            type="text"
            name="cardName"
            id="cardName"
            data-testid="name-input"
            value={ cardName } // aqui a props como value para que cardName no estado receba o que o usuário está digitando e salve no estado atraves da função do onChange, que também está sendo recebida por pros do App
            onChange={ onInputChange }
          />
        </label>
        <br />
        <label htmlFor="cardDescription">
          Descrição da Carta:
          <textarea
            name="cardDescription"
            id="cardDescription"
            cols="30"
            rows="10"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr1">
          Atributo-01:
          <input
            type="number"
            name="cardAttr1"
            id="cardAttr1"
            data-testid="attr1-input"
            max="90"// aqui confirma novamente que o numero maximo é 90;
            min="0"// e o mínimo de 0 o que força o input a não permitir outrois valores
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr2">
          Atributo-02:
          <input
            type="number"
            name="cardAttr2"
            id="cardAttr2"
            max="90"
            min="0"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr3">
          Atributo-03:
          <input
            type="number"
            name="cardAttr3"
            id="cardAttr3"
            max="90"
            min="0"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardImage">
          Imagem:
          <input // recebe o value da url ou local salvo da img que ainda não está funcinando
            type="text"
            name="cardImage"
            id="cardImage"
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardRare">
          Raridade:
          <select
            name="cardRare"
            id="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        {/* abaixo uma condicional para definir como o checkbox será renderizado, se true aparece a mensagem na tag p se false renderiza p checkbox para marcar e faz toda a logica de ter apenas uma carta super trunfo no baralho atraves das função atribuidas as props recebidas em cardTrunfo e hasTrunfo */}
        { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p>
          : (
            <label htmlFor="cardTrunfo">
              Super Trunfo
              <input
                type="checkbox"
                name="cardTrunfo"
                id="cardTrunfo"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                hasTrunfo={ hasTrunfo }
                onChange={ onInputChange }
              />
            </label>
          )}
        <button // salvar recebe a logica de salvar atraves das props recebidas em disabled e onClick
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,

};

export default Form;
