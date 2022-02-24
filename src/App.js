import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

const estadoInicial = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardTrunfo: false,
  cardRare: 'Normal',
  isSaveButtonDisabled: true,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = estadoInicial;
  }

  validar = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const valorMaxCard = 90;
    const totalCards = 210;
    const sumTotalCards = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    if (cardName && cardDescription && cardImage && cardRare && cardAttr1 >= 0
    && cardAttr2 >= 0 && cardAttr3 >= 0 && cardAttr1 <= valorMaxCard
    && cardAttr2 <= valorMaxCard && cardAttr3 <= valorMaxCard
    && sumTotalCards <= totalCards
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validar());
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div className="App">
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardTrunfo={ cardTrunfo }
          cardRare={ cardRare }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardTrunfo={ cardTrunfo }
          cardRare={ cardRare }
        />
      </div>
    );
  }
}

export default App;
