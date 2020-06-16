import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  './App.css';
import * as serviceWorker from './serviceWorker';

let numRows = 0;
let numCols = 0;
let color;
//
//
// class HelloWorld extends Component {
//   render() {
//     return <h1>Hello World!</h1>
//   }
// };
//
//

//const table = <table id = {"grid"} />;

class Grid extends Component {

  constructor(props) {
    super(props);
    this.numRows = numRows;
    this.numCols = numCols;
    this.state = {
        rows: [],
        columns: []

    };
  }

  addC = function(props){

           this.setState((prevState, props) => {
               if(this.state.rows.length === 0){
                   const x = <tr>
                       <td></td>
                   </tr>;
                   numRows++;
                   numCols++;
                   this.state.columns.push(<td></td>);
                   return {rows: [x]};

               }
               else{

                   let r = [];
                   this.state.columns.push(<td></td>);
                   for(let row of this.state.rows){
                       row = <tr>
                           {this.state.columns}
                       </tr>
                       r.push(row);


                   }
                   return {rows: r};
                  // const column = <td></td>;
                  // return {columns: [...prevState.column, column]};

               }


           });

    }

  render() {
    // const addRow = <button onClick={addR}>
//   Add Row
// </button>
//


// const removeRow = <button onClick={removeR}>
//   Remove Row
// </button>
//
// const removeColumn = <button onClick={removeC}>
//   Remove Column
// </button>
//
// const fillUncolored = <button onClick={fillU}>
//   Fill All Uncolored
// </button>
//
// const fillAll = <button onClick={fill}>
//   Fill All
// </button>
//
// const clear = <button onClick={clearAll}>
//   Clear
// </button>
//
// const select = <select onChange={selected} id={"selectedID"} >
//         <option value={"SELECT"} > SELECT </option>
//         <option value={"Red"}>Red</option>
//         <option value={"Blue"}>Blue</option>
//         <option value={"Green"}>Green</option>
//         <option value={"Yellow"}>Yellow</option>
// </select>

    return (

          <React.Fragment>


                  <button onClick={this.addC.bind(this)}>
                    Add Column
                  </button>

                  <table id = {"grid"}>
                      {this.state.rows}
                  </table>

          </React.Fragment>
    );
  }
};




ReactDOM.render(

    <Grid/>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
