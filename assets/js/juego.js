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

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let contadorPuntosJugadores = [];

    //Referencias del HTML:
    const btnNuevo     = document.querySelector('#btnNuevo'), 
        btnPedir     = document.querySelector('#btnPedir'), 
        btnDetener   = document.querySelector('#btnDetener');

    const puntosJugadores = document.querySelectorAll('small'),
        divCartas = document.querySelectorAll('.divCartas');

    // Esta función inicializa el juego:
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        for ( let i = 0; i<numJugadores; i++ ){
            contadorPuntosJugadores.push(0)
        }
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

    // Esta función es para calcular los puntos de cada jugador:
    // Turno: 0 = primer jugador y el último será la computadora.
    const acumularPuntos = (carta, turno) => {
        contadorPuntosJugadores[turno] += valorCarta( carta );
        puntosJugadores[turno].innerText = contadorPuntosJugadores[turno] 
        
        return contadorPuntosJugadores[turno];
    }

    //Esta función crea imágenes y las agrega en el div correspondiete:
    const crearCarta = (carta, turno) => {
        
        const imgCartas = document.createElement('img');
            imgCartas.src = `./assets/cartas/${ carta }.png`;
            imgCartas.classList.add('carta');
            divCartas[turno].append(imgCartas);
    }

    //Esta función determina el ganador:
    const determinarGanador = () => {

        const [puntosMinimo, puntosComputadora] = contadorPuntosJugadores;

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


    //______________________________________________________________________________

    //Turno de la computadora: tiene que hacer los puntos igual o superior al jugadora

    const turnoComputadora = (puntosMinimo) =>  {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            // puntosComputadora += valorCarta (carta);
            // puntosJugadores[1].innerText = puntosComputadora;

            puntosComputadora = acumularPuntos(carta, contadorPuntosJugadores.length - 1 );
            crearCarta(carta, contadorPuntosJugadores.length - 1 );

            if ( puntosMinimo > 21 ){
                break;
            } 
        } while ( (puntosComputadora < puntosMinimo) && ( puntosMinimo <= 21 ));
        
        determinarGanador();
    }

    


    //Eventos:

    btnPedir.addEventListener( 'click', () => {
        // inicializarJuego();

        const carta = pedirCarta();
        // puntosJugador += valorCarta (carta);
        // puntosJugadores[0].innerText = puntosJugador;
 
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta(carta, 0);
        
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

        inicializarJuego();

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        

        // puntosJugador     = 0;
        // puntosComputadora = 0;

        // puntosJugadores[0].innerText = 0;
        // puntosJugadores[1].innerText = 0;

        // cartasComputadora.innerHTML = '';
        // cartasJugador.innerHTML = '';

    });

})();

