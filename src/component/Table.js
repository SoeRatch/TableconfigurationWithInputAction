import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Button from '@material-ui/core/Button';
import ToggleOn from '@material-ui/icons/ToggleOn';
import ToggleOff from '@material-ui/icons/ToggleOff';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import './Table.scss';
import Input from '../lib/Input';
import Checked from '../lib/Checked';
import { add,remove } from '../actions/table'

const renderInputElement=(text,val,edit,id)=>{
	console.log(text);
	switch (text) {
	  case 'checkbox':
	  	return <Checked inputtype={text} inputvalue={val} edit={edit} />;
	  default:
	    return <Input inputtype={text} inputvalue={val} edit={edit} />;
	}

}

class Table extends React.Component{

		constructor(props) {
		super(props);
		this.state = {
			editId:'',
			pageindex:0,
			dataqty:6,
			fixeddataqty:6
		};
		
	}
 

	leftbtnClick=()=>{

			let paginationWrapper = document.querySelector('#pagination-wrapper');
			paginationWrapper.classList.add('transition-prev');

			setTimeout(()=>{
				paginationWrapper.classList.remove('transition-prev');
				if(this.state.dataqty<this.state.fixeddataqty){
					this.setState({
						...this.state,
						dataqty:this.state.fixeddataqty
					});
				}
				if(this.state.pageindex>=this.state.fixeddataqty){
					let requiredvalue = this.state.pageindex-this.state.fixeddataqty;
					this.setState({
						...this.state,
						pageindex:requiredvalue
					});
				}

			},500);
			  
			}

	rightbtnClick=()=>{
				let {rowObjects}=this.props;
				rowObjects=JSON.parse(JSON.stringify(rowObjects));

			let paginationWrapper = document.querySelector('#pagination-wrapper');
			paginationWrapper.classList.add('transition-next');

			setTimeout(()=>{
				paginationWrapper.classList.remove('transition-next');
				let maxLength = (rowObjects && rowObjects.length) || 0;
				
				if(this.state.pageindex+this.state.fixeddataqty>=maxLength ){
					
					if(this.state.pageindex<=maxLength){
						let rem = maxLength%7;
						if(rem>0){
							this.setState({
								...this.state,
								dataqty:rem
							});
						}
					}

				}
				
				if(this.state.pageindex+this.state.fixeddataqty<maxLength){
					let requiredvalue = this.state.pageindex+this.state.fixeddataqty;
						this.setState({
							...this.state,
							pageindex:requiredvalue
						});
				}

			},500);
			  
			}




	editAction=(e,id)=>{

		let clearElement = document.getElementById(`${this.state.editId}x`);
		if(clearElement){
			clearElement.style.background='#0ec0a5'
		}

		let rowElement=document.getElementById(`${id}x`);
		rowElement.style.background='#01a4f5';
		this.setState({
	        editId:id
	      });


	}

	doneAction=(e,id)=>{

		let clearElement = document.getElementById(`${this.state.editId}x`);
		if(clearElement){
			clearElement.style.background='#0ec0a5'
		}

		this.setState({
	        editId:''
	      });


	}

	addAction=(e,index)=>{

		this.props.add(index);

	}


	deleteAction=(e,index)=>{
		this.props.remove(index);
	}

	render(){
		let {tableHeader,rowObjects}=this.props;
		tableHeader=JSON.parse(JSON.stringify(tableHeader));
		rowObjects=JSON.parse(JSON.stringify(rowObjects));
		const {editId,pageindex,dataqty}=this.state;
		return (
				      <div className="displaywrapper">
										<table> 
									      <thead>
									        <tr>
									        	<th>ID</th>	
									        	{tableHeader && tableHeader.map((header,i)=>
									        		<th 
									        			style={{width:`${header.width}`}} 
									        			key={i} 
									        			scope="col">
									        				{header.label.split(" ")[0].toUpperCase()}
									        		</th>
									        		)					        		
										        }
									        		
									        		
									        </tr>
									      </thead>
									      <tbody>
									      		{
									      			tableHeader && 
									      			rowObjects && 
									      			rowObjects.slice(pageindex,pageindex+dataqty).map((item,j)=>
									      			[<tr key={`${item.id}x`} id={`${item.id}x`}>
									      				<td key={`${item.id}xid`} style={{position:'absolute'}}>
									      							{item.id}
									      					</td>
									      				{
									      					item && 
									      					item.colData && 
									      					item.colData.map((rowval,k)=>
									      						<td key={`${item.id}x${k}`}>
									      							{
																    	renderInputElement(tableHeader[k].type.toLowerCase(),rowval,item.id===editId?true:false,`${item.id}x${k}`)
																    }
									      						</td>
									      					)
									      				}
									        		</tr>,
												    <tr key={`${item.id}y`} >
												    <td>
												    <ButtonGroup
										              variant="contained"
										              color="secondary"
										              aria-label="full-width contained primary button group"
										            >
										                <Button 
												            	variant="contained"
												            	id={`${item.id}yA`}
												              	onClick={(e)=>this.addAction(e,j+pageindex)}>
														        <Add/>
														</Button>
														{item && item.id!==editId &&
															<Button 
												            	variant="contained"
												            	id={`${item.id}yA`}
												              	onClick={(e)=>this.editAction(e,`${item.id}`)}>
														        <ToggleOff/>Edit
														      </Button>
												        }
											            {item && item.id===editId &&
											            	<Button 
												            	variant="contained"
												            	id={`${item.id}yA`}
												              	onClick={(e)=>this.doneAction(e,`${item.id}`)}>
														        <ToggleOn/>Save
														      </Button> 
											            } 
												          <Button 	
												          			variant="contained" 
													            	color="secondary"
													            	id={`${item.id}yA`}
													              	onClick={(e)=>this.deleteAction(e,j+pageindex)}>
															        <DeleteIcon />
														</Button>
														
											            
											        </ButtonGroup></td>
												    	
												        
													</tr>]
													)

									      		}
									      	
											
									      </tbody>
								    </table>




								    <div className="pagination-wrapper" id="pagination-wrapper">
										  <svg 
										  onClick={this.leftbtnClick} className="btnangular btnangular--prev" height="56" viewBox="0 0 24 24" width="56" xmlns="http://www.w3.org/2000/svg">
										    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
										    <path d="M0-.5h24v24H0z" fill="none"/>
										  </svg>
										  	

										  		 <div className="pagination-container">
												    <div className="little-dot little-dot--first"></div>

												    <div className="little-dot">
												      <div className="big-dot-container">
												        <div className="big-dot"></div>
												      </div>
												    </div>

												    <div className="little-dot little-dot--last"></div>
												  </div>

										  
										  <svg 
										  	onClick={this.rightbtnClick}
										  	className="btnangular btnangular--next" height="56" viewBox="0 0 24 24" width="56" xmlns="http://www.w3.org/2000/svg">
										    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
										    <path d="M0-.25h24v24H0z" fill="none"/>
										  </svg>

									</div>


				    </div>
				  );
	}
}

Table.propTypes = {
  add:PropTypes.func.isRequired,
  remove:PropTypes.func.isRequired
};

export default connect(null,{add,remove})(Table);