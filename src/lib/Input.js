import React from 'react'


class Input extends React.Component{
  state={
    value:this.props.inputvalue
  }

  onChange=(e)=>{
    e.preventDefault();
    this.setState({
      ...this.state,
      value:e.value
    })
  }
  
  render(){
    const {inputtype} = this.props;
    if(this.props.edit){

      if(inputtype==='input' || inputtype==='password'){
        return(
                <input type={inputtype} value={this.state.value} onChange={this.onChange}/>
          );
      }
      if(inputtype==='text')
          return(
                  <input type={inputtype} value={this.state.value} readOnly/>
            );
      else
       return(
              <input type={inputtype} value={this.state.value}/>
        );

    }
    else{
      if((inputtype==='input' || inputtype==='password' || inputtype==="text"))
        return(
                <input type={inputtype} value={this.state.value} readOnly/>
          );
        else
         return(
                <input type={inputtype} value={this.state.value}/>
          );
    }


    
    
  }
}


export default Input

