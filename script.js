const quadradinhos = document.querySelectorAll('div.quads');
const tabuleiro = document.querySelector('section');
const divvenceu = document.querySelector('div.resultado');
const msgvenceu = document.querySelector('p.resultado');
const btrestart = document.querySelector('button#btres');
let vezo; // ------> Vez do Círculo
const combsvitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

// - Começar Jogo
const startGame = () => {
    vezo = false;  // Quando não for a vez do O, X começa.
    for (const quad of quadradinhos) {
        quad.classList.remove('o')
        quad.classList.remove('x')
        quad.removeEventListener('click', jogadas)
        quad.addEventListener('click', jogadas, {once:true})
    };

    hoverTransp();
    divvenceu.classList.remove('msg-vencedor');
};

// - Terminar Jogo
const endGame = (combiguais) => {
    // Se houver Empate:
    if (combiguais) {
        msgvenceu.innerHTML = 'Empate!!!';
    }
    // Se houver Vitória:
    else {
        msgvenceu.innerHTML = vezo ? 'O Venceu!!!' : 'X Venceu!!!';
    }
    // Vai adicionar uma classe que irá dar Display Flex na Div Venceu.
    divvenceu.classList.add('msg-vencedor');
};

// Verificações -----------------------------------------------------------

// - Verificar Vitória
const verivit = (jogadorAtual) => {
    // Retorne pra mim *ALGUMA* combinação dentro da lista de combinações
    return combsvitoria.some((combinacao) => {
        // *TUDO* que tem nessa lista...
        return combinacao.every((index) => {
            // Deve interagir com todos os quadradinhos.
            return quadradinhos[index].classList.contains(jogadorAtual);
            /*
            Quando os quadradinhos do tabuleiro tiverem alguma combinação
            equivalente à vitória, essa informação será enviada para o
            *TODO*, que vai virar True e vai falar com o *ALGUMA* que também
            vai enviar true (isto é se tudo estiver certo) para a const.
            */
        });
    });
};

// - Verificar Empate
const veriemp = () => {
    // Se *TODOS* os quadradinhos OBS: VER ESSA RETICÊNCIAS
    return [...quadradinhos].every((quad) => {
        /* 
        Tiverem X ou O, ou seja, nenhuma combinação pra vitória, então isso
        trará um empate, pois o tabuleiro está completamente preenchido
        */
        return quad.classList.contains('x') || quad.classList.contains('o');
        /*
        Com essa informação do que contém dentro de cada quadradinho, elas serão
        retornadas para o *TUDO*, e se ele estiver completamente preenchido por
        X ou O, então ele irá retornar para a função Verificadora do Empate.
        */
    });
};

// Ações ------------------------------------------------------------------

// - Lugar Marcado (e registrado)
const lugarMarcado = (quad, adClasses) => {
    // Irá adicionar as classes da função adClasses
    quad.classList.add(adClasses); 
    /*
    Essa função nada mais nada menos do que irá registrar no HTML dos quadradinhos
    cada função armazenada no adClasses, e ficará registrada até ser limpada
    novamente em outro jogo.
    */
};

// - Vez do (Hover Transparente) do X e do O
const hoverTransp = () => {
    // Primeiramente, devemos limpar a classe atual pra adicionar uma nova
    tabuleiro.classList.remove('o');
    tabuleiro.classList.remove('x');
    
    
    // Segundamente, só adicionarmos quando for a vez de cada um
    if (vezo) {
        tabuleiro.classList.add('o');
    } else {
        tabuleiro.classList.add('x');
    }
};

// - Trocador de Vez
const trocaVez = () => {
    // Quando o O for esperar aqui, o X vai executar... e Vice-versa
        // Quando É aqui, 'X' executa... Quando NÃO É, 'O' executa
            // Tudo isso pois primeiro é o X, entendeu?
    vezo = !vezo;

    hoverTransp();
    /*
    Após construir essa logicazinha de vez de um e de outro, iremos pedir as
    informações da lógica de troca do Hover: tirar e botar classes.
    */
};

// - Jogadas nas Casas
const jogadas = (e/*Poderia ser qualquer letra*/) => {
    // Jogar X ou O
    const quad = e.target; // Interação com a casinha
    const adClasses = vezo ? 'o' : 'x' ; // adicionará X ou O nas classes

    lugarMarcado(quad, adClasses);
    /*
    Irei pedir as informações da função do lugarMarcado e incorporá-las aqui
    nessa função de jogadas. Irei enviar as minhas duas variáveis principais para
    poder executar o código das marcações.
    */

    // Verificar Vitória
    const cVenceu = verivit(adClasses);
    /*
    Incorporando o verificador com essa const para montar a lógica da partida
    nessa função global de jogadas (o coração)
    */

    // - Verificar Empate
    const csEmpatou = veriemp();
    /*
    Mesmo rolê, mas como o empate ele basicamente analisa a classe das casas, não
    preciso enviar nenhuma informação (variável) pra ele.
    */

    // - A Partida
    if (cVenceu) {
        endGame(false);
    } else if (csEmpatou) {
        endGame(true);
    } else {
        trocaVez();
    }
    /*
    Ou seja, enquanto eu não vencer/perder ou empatar, o jogo irá mudar a vez até
    haver algum desfecho de algum dos lados.
    */
};

startGame();

btrestart.addEventListener('click', startGame);


