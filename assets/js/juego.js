// 2C = Two of Clubs 
// 2D = Two of Diamonds 
// 2H = Two of Hearts 
// 2S = Two of Spades

//Patrón Módulo: patrón de diseño más común en JS, compatible casi con cualquier versión. Permite encapsular y proteger el código. Función anónimo autoinvocada.
( () => {

    'use strict';

    //Baraja
    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'], 
        especiales   = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;


    //Referencias del HTML:
    const btnNuevo     = document.querySelector('#btnNuevo'), 
        btnPedir     = document.querySelector('#btnPedir'), 
        btnDetener   = document.querySelector('#btnDetener');

    const puntosJugadores      = document.querySelectorAll('small'),
        cartasJugador        = document.querySelector('#jugador-cartas'),
        cartasComputadora    = document.querySelector('#computadora-cartas');

    // Esta función inicializa el juego:
    const inicializarJuego = () => {
        deck = crearDeck();
    }



    // Esta función crea una nueva baraja en aleatorio:
    const crearDeck  = () => {

        deck = [];

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
        
        return _.shuffle(deck)  ;
    }  

    // Esta función permite tomar una carta:

    const pedirCarta = () => {

        if (deck.length === 0){
            throw 'No hay cartas en la baraja';
        }
    
        return deck.pop();    
    }

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

    //const valor = valorCarta(pedirCarta());
    //console.log({valor})
    //______________________________________________________________________________

    //Turno de la computadora: tiene que hacer los puntos igual o superior al jugadora

    const turnoComputadora = (puntosMinimo) =>  {
        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta (carta);
            puntosJugadores[1].innerText = puntosComputadora;

            const imgCartas = document.createElement('img');
            imgCartas.src = `./assets/cartas/${ carta }.png`;
            imgCartas.classList.add('carta')
        
            cartasComputadora.append(imgCartas);
            if ( puntosMinimo > 21 ){
                break;
            } 
        } while ( (puntosComputadora < puntosMinimo) && ( puntosMinimo <= 21 ));
        
        setTimeout(() => {
            if ( puntosComputadora === puntosMinimo ) {
                alert('Empate entre computadora y jugador');
            } 
            else if ( puntosMinimo > 21){
                alert('Computadora ha ganado el juego');
            }
            else if ( (puntosComputadora > 21) ) {
                alert('Jugador ha ganado el juego');
            }         
            else{
                alert('Computadora ha ganado el juego');
            }
        }, 100)

    }


    //Eventos:

    btnPedir.addEventListener( 'click', () => {

        const carta = pedirCarta();
        puntosJugador += valorCarta (carta);
        puntosJugadores[0].innerText = puntosJugador;

        const imgCartas = document.createElement('img');
            imgCartas.src = `./assets/cartas/${carta}.png`;
            imgCartas.classList.add('carta')
        
            cartasJugador.append(imgCartas);
        
        if ( puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
        } else if ( puntosJugador === 21 ){
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    })

    btnNuevo.addEventListener('click', () => {

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        deck = [];
        deck = crearDeck();  

        puntosJugador     = 0;
        puntosComputadora = 0;

        puntosJugadores[0].innerText = 0;
        puntosJugadores[1].innerText = 0;

        cartasComputadora.innerHTML = '';
        cartasJugador.innerHTML = '';

    });

})();

