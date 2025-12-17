

export default function GameBoard({onSelectSquare, board}){


    // const [gameBoard, setGameBord]  = useState(initialGameBoard);
    
    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBord((prevGameBoard)=>{
    //         const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updateBoard[rowIndex][colIndex]= activePlayerSymbol;
    //         return updateBoard;
    //     })
    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex)=>(
                            <li key={colIndex}>
                                <button onClick={()=>onSelectSquare(rowIndex, colIndex)} disabled = {playerSymbol !== null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            )
            )}
        </ol>
    )
}