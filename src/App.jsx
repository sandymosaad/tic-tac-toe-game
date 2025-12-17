import Player from "./Components/Player/Player"
import GameBoard from "./Components/GameBoard/GameBoard"
import { useState } from "react"
import Log from "./Components/Log/Log";
import {WINNING_COMBINATIONS} from "./Components/WINNING_COMBINATIONS/WINNING_COMBINATIONS"
import GameOver from "./Components/GameOver/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns){
   let currentPlayer = "X";
    if(gameTurns.length>0 && gameTurns[0].player === 'X'){
      currentPlayer = "O";
    }
    return currentPlayer;
  }

  function deriveWinner(gameBoard, players){
      let winner = null;
      for( const combination of WINNING_COMBINATIONS){
          const  firstSquareSymbol = gameBoard[combination[0].row][combination[0].col] ;
          const  secondSquareSymbol =  gameBoard[combination[1].row][combination[1].col];
          const  thirdSquareSymbol  = gameBoard[combination[2].row][combination[2].col];

          if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
          ) {
            winner = players[firstSquareSymbol];
          }
        }
        return winner;
  }

function deriveGameBoard(gameTurns){
    let gameBoard = [...initialGameBoard.map(array => [...array])];
    for (const turn of gameTurns){
        const { square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;

}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);


    const winner = deriveWinner(gameBoard, players)
    const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns( prevTurn =>{
        let currentPlayer = deriveActivePlayer(prevTurn)
        const updateTurn = [
          {square:{row:rowIndex, col:colIndex},
          player:currentPlayer
          },
          ...prevTurn];
        return updateTurn; 
  });
  }
  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange (symbol, newName){
  setPlayers(prevPlayers => {
    return {
      ...prevPlayers,
      [symbol]:newName
    };
  });
  } 

  return (
   <main>
    <div id = "game-container">

      <ol id = "players" className="highlight-player">
          <Player initialName = {PLAYERS.X} symbol = {"X"} isActive = {activePlayer ==='X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName = {PLAYERS.O}  symbol = {"O"} isActive = {activePlayer ==='O'} onChangeName={handlePlayerNameChange}/>
      </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}

      <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol = {activePlayer} board={gameBoard}/>
    </div>
    <Log turns = {gameTurns}/>
   </main>
  )
}

export default App
