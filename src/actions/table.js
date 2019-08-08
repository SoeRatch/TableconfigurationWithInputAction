import {
	DELETE_ROW,
	ADD_ROW
	} from '../types';


const deleteit = (index) =>({
	type: DELETE_ROW,
	index
});

const addit = (index) =>({
	type: ADD_ROW,
	index
});

export const remove = (index) => (dispatch) =>{
	dispatch(deleteit(index))
};

export const add = (index) => (dispatch) =>{
	dispatch(addit(index))
};



