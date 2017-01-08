import React from 'react';
import '../Styles/Game.css';
import Board from './Board.js';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: this.initializeArray()
      }],
      xIsNext: true,
      stepNumber: 0,
      logOrderAscending: true,
      gameOver: false
    };
  }
  initializeArray(){
    let result = [];
    for(let i = 0; i < 9; i++){
      result.push({value: null, winner: false});
    }
    return result;
  }
  handleLogOrder(){
    this.setState({
      logOrderAscending: !this.state.logOrderAscending
    })
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares));

    const isGameOver = this.calculateWinner(squares);
   
    if (this.calculateWinner(squares) || squares[i].value) {
              
        return;
    }
        
    squares[i].value = this.state.xIsNext ? 'X' : 'O';

    if(this.calculateWinner(squares)){
      debugger;
      for(let i = 0; i < this.calculateWinner(squares).line.length; i++){
          squares[this.calculateWinner(squares).line[i]].winner = true;
      }  
    }
    this.setState({
        history: history.concat([{
        squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
    });
  }
  jumpTo(step) {
    this.setState({
        stepNumber: step,
        
    });
  }
  renderLog(moves){
    return this.state.logOrderAscending ? <ol>{moves}</ol> : <ol reversed>{moves.reverse()}</ol>
  }
  
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
        return {winnerValue: squares[a].value, line: lines[i]};
      }
    }
    return null;
  }
  // applyWinnerStyle(squares, line){
  //   const tempSquares = JSON.parse(JSON.stringify(squares));
  //   let history = this.state.history;
  //   for(let i = 0; i < line.length; i++){
  //     tempSquares[line[i]].winner = true;
  //   }
    
  //   this.setState({
  //     history: history.concat([{
  //       squares: tempSquares
  //       }]),
  //     gameOver: true
  //   })
  // }
  // componentDidUpdate(prevProps, prevState){
  //   const history = this.state.history;
  //   const current = history[this.state.stepNumber];
    
  //   if(this.calculateWinner(current.squares) && !prevState.gameOver){      
  //     const winnerLine = this.calculateWinner(current.squares).line;
  //     this.applyWinnerStyle(current.squares, winnerLine);
      
     
  //   }    
  // }
  render() {
    //  console.log(this.state);
    const history = this.state.history;
    const current = history[this.state.stepNumber];
     
    const winner = this.calculateWinner(current.squares) ? this.calculateWinner(current.squares).winnerValue : null;
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    //console.log(history);
    const moves = history.map((step, move) => {
        const desc = move ?
            'Move #' + move :
            'Game start';
        return (
            <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
            </li>
        );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {this.renderLog(moves)}
          <button onClick={() => this.handleLogOrder()}> Reverse </button>
        </div>
      </div>
    );
  }
}

export default Game;
