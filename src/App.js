import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const playerRed = "R";
  const playerYellow = "Y";
  const [currPlayer, setCurrPlayer] = useState(playerRed);
  const [gameOver, setGameOver] = useState(false);
  let [board, setBoard] = useState([]);
  const rows = 6;
  const columns = 7;
  const [currColumns, setCurrColumns] = useState([5, 5, 5, 5, 5, 5, 5]);
  
  useEffect(()=> {
    setGame();
  }, []);

  const getPlayerClass = (r,c) => {
    if (board && board[r] && board[r][c]) {
      return board[r][c] === playerRed ? "red-piece" : board[r][c] === playerYellow ? "yellow-piece" : ""
    }
    return '';
  }

  const setGame = () => {
    let boardSpaces = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
          // JS
          row.push(' ');
          // HTML
      }
      boardSpaces.push(row);
    }
    setBoard(boardSpaces);
  }

  const setPiece = (e) => {
    console.log('aaaa', board);
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = e.target.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    let currentColArr = [...currColumns];
    r = currentColArr[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }
    
    let boardSpaces = [...board];
    boardSpaces[r][c] = currPlayer; //update JS board
    setBoard(boardSpaces);
    setCurrPlayer(currPlayer === playerRed ? playerYellow : playerRed);

    r -= 1; //update the row height for that column
    currentColArr[c] = r; //update the array
    setCurrColumns(currentColArr);
    //checkWinner();
  }

 

  return (
    <div className="App">
      <div id="board">
        {Array.from(Array(rows), (e, r) => 
          <>
            {Array.from(Array(columns), (e, c) => 
              <div key={r.toString() + "-" + c.toString()} onClick={setPiece} id={r.toString() + "-" + c.toString()} className={"tile " + getPlayerClass(r,c)}></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
