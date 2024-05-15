
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
    console.log(deck)
    return deck;
}
crearDeck();    

// Esta función permite tomar una carta:

const pedirCarta = () => {

    if (deck.length === 0){
        throw 'No hay cartas en la baraja';
    }
    const carta = deck.pop();
    console.log(carta);
    return carta;    
}
let carta = pedirCarta();

//Esta función permite obtener el valor de la carta: 

const valorCarta = ( carta ) => {
    // puntos = 0;
    // const valor = carta.substring(0, carta.length - 1);
    // console.log(valor);
    // if (isNaN(valor)) {
        //     if (valor === 'A'){
            //         puntos = 11;            
            //     }else{
                //         puntos = 10;
                //     }
                // } else {
                    //     puntos = valor * 1
                    // }
                    // console.log({puntos});
                    // Lo anterior resumido sería lo siguiente:
                    
    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
           : valor * 1;    
}

const valor = valorCarta(pedirCarta());
console.log({valor})