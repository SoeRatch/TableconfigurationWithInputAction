import React from 'react';
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import './App.css';
import Table from './component/Table';


class App extends React.Component{


render(){
  const {tableHeader,rowObjects} = this.props;
  return(
    <div className="App">
        <div>ASSIGNMENT TABLE</div>
        <Table tableHeader={tableHeader} rowObjects={rowObjects} />

    </div>
  );
}

}

const mapStateToProps = state => ({
  tableHeader: state.table.get('header'),
  rowObjects:state.table.get('rowobjects')
})

App.propTypes = {
  tableHeader:PropTypes.arrayOf(PropTypes.shape({
        label:PropTypes.string.isRequired,
        width:PropTypes.string.isRequired,
        type:PropTypes.string.isRequired
      })
  ).isRequired,
  rowObjects:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        colData:PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
      })
  ).isRequired
};

export default connect(mapStateToProps)(App)