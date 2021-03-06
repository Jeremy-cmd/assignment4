import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  './App.css';
import * as serviceWorker from './serviceWorker';




class Grid extends Component {

  constructor(props) {
    super(props);
    this.numRows = 0;
    this.numCols = 0;
    this.state = {
        rows: [],
        columns: [],
        color: "",
        onmousedown: false

    };
  }



  mousedown = function(props){

      this.setState({
          onmousedown : true
      })

      props.target.style.backgroundColor = this.state.color;

  }

  mouseup = function(props){

      // onmousedown is false if not holding click
      this.setState({
          onmousedown : false
      })
  }

  addcolorOver = function(props){

      // only change color if mouse click is on hold
      if(this.state.onmousedown){
          props.target.style.backgroundColor = this.state.color;
      }

  }



  addC = function(props){



           this.setState((prevState, props) => {
               if(this.numRows === 0){
                   const x = <tr>
                       <td onMouseDown={this.mousedown.bind(this)} onMouseUp={this.mouseup.bind(this)}
                           onMouseOver={this.addcolorOver.bind(this)}  ></td>
                   </tr>;
                   //store all columns
                   this.state.columns.push(<td
                       onMouseDown={this.mousedown.bind(this)} onMouseUp={this.mouseup.bind(this)}
                       onMouseOver={this.addcolorOver.bind(this)}  ></td>);
                   this.numRows++;
                   this.numCols++;
                  // this.state.columns.push(<td onClick={this.addcolor(this.numCols)}></td>);
                 //  this.state.columns.push(<td onClick={this.addcolor.bind(this)}></td>);

                   return {rows: [x]};

               }
               else{

                   let r = [];
                   //add onclick method for each cell
                   this.state.columns.push(<td
                       onMouseDown={this.mousedown.bind(this)} onMouseUp={this.mouseup.bind(this)}
                       onMouseOver={this.addcolorOver.bind(this)}  ></td>);
                   this.numCols++;
                   //this.state.columns.push(<td onClick={this.addcolor.bind(this)}></td>);
                   for(let row of this.state.rows){
                       row = <tr>
                           {this.state.columns}
                       </tr>
                       r.push(row);


                   }

                   //change state to update rows
                   return {rows: r};
                  // const column = <td></td>;
                  // return {columns: [...prevState.column, column]};

               }


           });

    }

    removeC = function(props){

      this.setState((prevState, props) => {


        if(this.state.columns.length === 1){
            this.numRows = 0;
            this.numCols = 0;
            return {rows: [], columns:[]};
        }
        else{
            let r = [];
            //remove last column
            this.state.columns.pop();
            for(let row of this.state.rows){
                row = <tr>
                    {this.state.columns}
                </tr>
                r.push(row);
            }
            this.numCols--;
            //update rows
            return {rows: r};
        }

      });

    }

    addR = function(props){

        this.setState((prevState, props) => {
            if(this.state.rows.length === 0){
                const x = <tr><td onMouseDown={this.mousedown.bind(this)} onMouseUp={this.mouseup.bind(this)}
                                  onMouseOver={this.addcolorOver.bind(this)}></td></tr>;
                this.numRows++;
                this.numCols++;
                this.state.rows.push(x);
                this.state.columns.push(<td onMouseDown={this.mousedown.bind(this)} onMouseUp={this.mouseup.bind(this)}
                                            onMouseOver={this.addcolorOver.bind(this)}></td>);
                return {rows: [x]};

            }
            else{

                let r = [];
                this.state.rows.push( <tr>{this.state.columns}</tr>);
                for(let row of this.state.rows){
                    r.push(row);
                }

                this.numRows++;
                return {rows: r};
                // const column = <td></td>;
                // return {columns: [...prevState.column, column]};

            }


        });

    }

    removeR = function(props){

        this.setState((prevState, props) => {
            if(this.numRows <= 1) {
                this.numRows = 0;
                this.numCols = 0;
                return {columns: [], rows: []};
            }
            else{
                let r = [];
                //remove last row
                this.state.rows.pop();

                    for(let row of this.state.rows){
                        r.push(row);
                    }
                this.numRows--;
                return {rows: r};
            }
        });

    }

    selected = function(props){

        this.setState({
            // change color
            color: props.target.value
        });

    }

  render() {

    return (

          <React.Fragment>

                  <button onClick={this.addR.bind(this)}>
                      Add Row
                  </button>

                  <button onClick={this.addC.bind(this)}>
                    Add Column
                  </button>

                  <button onClick={this.removeR.bind(this)}>
                      Remove Row
                  </button>

                <button onClick={this.removeC.bind(this)}>
                Remove Column
               </button>


               {/* <button onClick={this.fillU.bind(this)}>*/}
               {/*  Fill All Uncolored*/}
               {/*</button>*/}

               {/* <button onClick={this.fill.bind(this)}>*/}
               {/*  Fill All*/}
               {/*</button>*/}

               {/*<button onClick={this.clearAll.bind(this)}>*/}
               {/*  Clear*/}
               {/*</button>*/}


              <select onChange={this.selected.bind(this)} id={"selectedID"} >
                     <option value={"SELECT"} > SELECT </option>
                     <option value={"Red"}>Red</option>
                     <option value={"Blue"}>Blue</option>
                     <option value={"Green"}>Green</option>
                     <option value={"Yellow"}>Yellow</option>
               </select>

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
