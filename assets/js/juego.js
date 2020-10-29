/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

 const miModulo = ( () => {

    'use strict'

    //Inicializaciones de las variables:
    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          cartasLetras = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias del HTML:

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.div-cartas'),
          sumatoriaPuntos = document.querySelectorAll('small');

    
    //Esta funcion inicializa el juego:
    
    const inicializarJuego = ( numeroJugadores = 2 ) => {

        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
            
        }

        sumatoriaPuntos.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }


    //Funcion para crear un nuevo deck:
    const crearDeck = () => {

        deck = [];

        //Para las cartas de numeros
        for (let i = 2; i <= 10; i++) {

            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        //Para las cartas de Letras
        for (let tipo of tipos) {
            for (let cartaLetra of cartasLetras) {
                deck.push(cartaLetra + tipo);
            }
        }

        //Para ponerlas en orden aleatorio
        return _.shuffle(deck);
    }


    // Funcion para tomar una carta
    const tomarCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay mas cartas en el deck';
        }

        return deck.pop();
    }

    // Funcion para conocer el valor de la carta
    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN (valor) ) ?
                    (valor === 'A') ? 11 : 10
                    : valor * 1;

    }

    //turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        sumatoriaPuntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('cartas');
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout( () => {

            if ( puntosComputadora === puntosMinimos ) {

                alert('¡Empate!');
        
            }else if ( puntosMinimos > 21 ) {
        
                alert('¡Perdiste!');
        
            }else if (puntosComputadora > 21) {
                
                alert('¡Ganaste!');
        
            }else {
                alert('Computadora gana');
            }

        }, 100 );

    }

    //Turno de la computadora:

    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;


        do {
            
            const carta = tomarCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }

    // ----- Eventos:


    //Boton Pedir Carta:
    btnPedir.addEventListener('click', () => {

        const carta = tomarCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('¡PERDISTE!');
            btnPedir.disabled = true;
            btnDetener.disabled =true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador === 21) {
            console.warn('¡21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled =true;
            turnoComputadora( puntosJugador );
        }
    });



    //Boton para detener:

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled =true;

        turnoComputadora(puntosJugadores[0]);
    });



    //Boton para Nuevo Juego

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });


    return {

        nuevoJuego: inicializarJuego

    };

 })();