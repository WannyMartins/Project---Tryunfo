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
  baralhoSalvo: [],
  hasTrunfo: false,
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

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
      baralhoSalvo } = this.state;

    const novaCarta = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
      baralhoSalvo };

    this.setState((estadoAnterior) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      baralhoSalvo: [...estadoAnterior.baralhoSalvo, novaCarta],
    }));
    if (cardTrunfo) this.setState({ hasTrunfo: true });
  }

  listaCartasSalvas = () => {
    const { baralhoSalvo } = this.state;
    return baralhoSalvo.map((card) => {
      const { cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardTrunfo,
      } = card;
      return (<Card
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardTrunfo={ cardTrunfo }
        cardRare={ cardRare }
        key={ cardName }
      />);
    });
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
      hasTrunfo,
    } = this.state;
    return (
      <>
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
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <h2>Preview</h2>
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
        <div>
          <h2>Baralho</h2>
          { this.listaCartasSalvas() }
        </div>
      </>
    );
  }
}

export default App;
