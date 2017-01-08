import Square from './Square.js';
import React from 'react';

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i].value} winner={this.props.squares[i].winner} onClick={() => this.props.onClick(i)} />;
  }

  squaresForRow(rowNumber){
      const result = [];
      for(let i = 0; i < 3; i++){
          result.push(this.renderSquare(i + 3*rowNumber));
      };
      return result;
  }
  rowsForBoard(){
      const result = [];
      for(let i = 0; i < 3; i++){
          result.push(<div key={i}>{this.squaresForRow(i)}</div>);
      };
      return result;
  }

  render() {
    //console.log(this.props);
    return (
      <div>                     
        {this.rowsForBoard()}
      </div>
    );
  }
}

export default Board;