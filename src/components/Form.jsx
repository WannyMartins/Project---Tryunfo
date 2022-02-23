import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="nameCard">
          Nome da Carta:
          <input
            type="text"
            name="nameCard"
            id="nameCard"
            data-testid="name-input"
          />
        </label>
        <label htmlFor="descriptionCard">
          Descrição da Carta:
          <textarea
            name="descriptionCard"
            id="descriptionCard"
            cols="30"
            rows="10"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="attr1">
          Atributo-01:
          <input
            type="number"
            name="attr1"
            id="attr1"
            data-testid="attr1-input"
          />
        </label>
        <label htmlFor="attr2">
          Atributo-02:
          <input
            type="number"
            name="attr2"
            id="attr2"
            data-testid="attr2-input"
          />
        </label>
        <label htmlFor="attr3">
          Atributo-03:
          <input
            type="number"
            name="attr3"
            id="attr3"
            data-testid="attr3-input"
          />
        </label>
        <label htmlFor="image">
          Imagem:
          <input
            type="text"
            name="image"
            id="image"
            data-testid="image-input"
          />
        </label>
        <label htmlFor="rare">
          Raridade:
          <select
            name="rare"
            id="rare"
            data-testid="rare-input"
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          Super Trunfo
          <input
            type="checkbox"
            name="trunfo"
            id="trunfo"
            data-testid="trunfo-input"
          />
        </label>
        <button
          type="button"
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
