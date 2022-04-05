import React from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Form from './components/Form';

const estadoInicial = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
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
    const sumTotalCards = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);// sumTotalCards = pega a soma dos atributos das cartas
    if (cardName // se existir valor
      && cardDescription // se existir valor
      && cardImage // se existir valor
      && cardRare // se existir valor
      && cardAttr1 >= 0 // limitando valor para não ser negativo
      && cardAttr2 >= 0 // limitando valor para não ser negativo
      && cardAttr3 >= 0 // limitando valor para não ser negativo
      && cardAttr1 <= valorMaxCard // limitando o valor não ser maior que 90
      && cardAttr2 <= valorMaxCard // limitando o valor não ser maior que 90
      && cardAttr3 <= valorMaxCard // limitando o valor não ser maior que 90
      && sumTotalCards <= totalCards // limitando a soma dos atributos para não ser maior que 120;
    ) {
      this.setState({
        isSaveButtonDisabled: false, // se cumprir as condições o estado do muda para habilitado, por isso disabled recebe false;
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true, // se não cumprir continua true então fica desabilitado
      });
    }
  }

  onInputChange = ({ target }) => { // descontui o target do event.target; que representa o local exato onde está acontecendo uma ação;
    const { name } = target; // aqui o atributo name do input recebe o target para identificar exatamente onde está sofrendo mudança;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // caso o target seja no checkbox tem que alterar o tributo checked recebe true, o que significa que será setado o estado para checked se não for o type checkbox o target continua a localizar o name e receber o value
    this.setState({
      [name]: value, // aqui onde a função é chamada recebe como chave o name de onde estiver e como valor o que está sendo digitado ou fazendo;
    }, () => this.validar()); // então após cada value ser setado na sua própria chave é chamada a função de validar para realmente confirmar o estado setado
  }

  onSaveButtonClick = (event) => {
    event.preventDefault(); // aqui previne que o button realise um refresh na página

    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
      baralhoSalvo } = this.state;
      // então peguei o estado atual e declarei ele numa nova constante para copiar dos dados e gerar a nova carta;

    const novaCarta = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
      baralhoSalvo };

    this.setState((estadoAnterior) => ({ // seto o estado como o inicial para limpar os inputs e manterndo card trunfo desabilitado se baralho salvo já tiver um super trunfo
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      isSaveButtonDisabled: true,
      baralhoSalvo: [...estadoAnterior.baralhoSalvo, novaCarta], // crio o array de cartas pegando todas as cartas anteriores  já geradaas e acrescentando os dados da nova carta que é a clonagem do estado atual setado apos preencher os inpus;
    }));
    if (cardTrunfo) this.setState({ hasTrunfo: true });// agora sim seto o valor de hasTrunfo para true se card trunfo tmbem estiver true
  }

  excluirCard = (event) => {
    event.target.parentNode.remove();// esta função remove o elemento pai que está o botão 'Excluir' sendo clicado;
  };

  listaCartasSalvas = () => {
    const { baralhoSalvo } = this.state;
    return baralhoSalvo.map((card) => { // esta função recupera o state do baralhoSalvo e faz um map para mostrar na tela cada carta salva com suas descrições
      const { cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardTrunfo,
      } = card;
      return (
        <section // então retorna esta section com as cartas salvas conforme o componete Card está formatado para renderizar, enviado os dados do map como props para o component Card
          id="cardSalva"
          key={ cardName } // name é a key de cada carta porque não pode ter cartas com mesmo nome
        >
          <div>
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
            <Button excluirCard={ this.excluirCard } />
            {/* cada card recebe um button com a possibilidade de excluir esta carta do balaho Salvo */}
          </div>
        </section>
      );
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
        {/* então o componete App renderiza na tela o título do jogo, pede para adicionar nova carta e chama o componete Form */}
        <h1>Tryunfo</h1>
        <h2>Adicione nova Carta</h2>
        <Form
        // o App passa para o form via props todos os estados necessarios para renderizar e também as funções de preenchimento e atualização dos estados e de salvar as cartas no baralho salvo
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
        <h2>Pré-visualização</h2>
        <Card
        // Card também é renderizado para previsualizar as cartas antes de salvar, também recebe o estado via props para isto acontecer de fato
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardTrunfo={ cardTrunfo }
          cardRare={ cardRare }
        />
        <div id="cartasSalvas">
          <h2>Todas as Cartas</h2>
          {/* por fim chamamos a função para renderizar toda a lista de cartas salvas */}
          { this.listaCartasSalvas() }
        </div>
      </>
    );
  }
}

export default App;
