
// 2C = Two of Clubs 
// 2D = Two of Diamonds 
// 2H = Two of Hearts 
// 2S = Two of Spades

//Baraja
let deck        = [];
let tipos       = ['C', 'D', 'H', 'S'];
let especiales  = ['A', 'J', 'Q', 'K'];

// Esta función crea una nueva baraja en aleatorio:
const crearDeck  = () => {

    for (let i=2; i <=10; i++){
        for (let tipo of tipos){
            deck.push(i + tipo)  
        }
    }

    for (let especial of especiales){
        for (let tipo of tipos){
            deck.push(especial + tipo)
        }
    }
    
    //Esta baraja está en orden. Por lo que para que salga desordenado, 
    // usaremos una librería: underscore para revolver todas las cartas.
    deck = _.shuffle(deck);

    return deck;
}

crearDeck();    


// Esta función permite tomar una carta: