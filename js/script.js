//seleciona todos os elementos com a classe "cell" - (celulas do tabuleiro)
const cells = document.querySelectorAll('.cell');

//Seleciona o botão de reiniciar o jogo
const restarButton = document.querySelector('.restart-btn');

//seleciona onde o status do jogo será exibido
const gameStatus = document.querySelector('.game-status');


//Armazena o estado atual do jogo Array[]
let gameState = ["","","","","","","","",""];

//define o jogador inicial("X" ou "O")
let initialPlayer = 'X';

//combinaçoes vencedoras do jogo
const WinningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//função de clique na celula 
function cellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

 //verifica se a celula esta prencihada ou se o jogo acabou
 if (gameState[cellIndex] !== "" || checkWinner()){
    return;
 }

 //prenche a celula com o simbolo do jogador atual
 gameState[cellIndex] = initialPlayer;
 cell.textContent = initialPlayer;

 //verifica se há um vencedor ou empate
 if (checkWinner()) {
    gameStatus.textContent = `jogador ${initialPlayer} venceu!`;
 } else if (!gameState.includes("")) {
    gameStatus.textContent = "Empate!";
 } else{
    //alterna para o proximo jogador
    initialPlayer = initialPlayer === 'X' ? 'O' : 'X'
 }

}

//verifica se tem ganhador
function checkWinner(){
    return WinningCombinations.some(combination =>{
        return combination.every(index => {
            return gameState[index] === initialPlayer;
        })
    })
}

//função para reiniciar o jogo
function restarGame(){
    gameState = ["","","","","","","","",""];
    initialPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameStatus = '';
}

//adicionando um ouvinte de evento de clique a cada celula
cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
})

//adicionando um ouvinte de evento clique no botao reiniciar
restarButton.addEventListener('click', restarGame);