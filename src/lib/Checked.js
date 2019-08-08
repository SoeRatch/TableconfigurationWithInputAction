import React from 'react'


class Checked extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isGoing: this.props.inputvalue
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    if(this.props.edit)
      this.setState({
        [name]: value
      });
    else
      this.setState({
        [name]: this.state[name]
      });
  }

  

  render(){
    return(
      <input name="isGoing" type={this.props.inputtype} checked={this.state.isGoing} onChange={this.handleInputChange}/>
      );
    }
}
export default Checked
