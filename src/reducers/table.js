import Immutable from 'immutable'
import {
	DELETE_ROW,
	ADD_ROW
	} from '../types';

import jsondata from '../data.json';

const tableState = Immutable.fromJS({
  header: jsondata["colDefs"],
  rowobjects:jsondata["data"]
})



const table = (state=tableState, action={}) => {
  switch (action.type) {
  	case DELETE_ROW:
      return state.set('rowobjects', state.get('rowobjects').splice(action.index,1));
    case ADD_ROW:
      let addedobject=[{
		      id:"uniqueRowIdx"
		    }];
	  let prevHeaderlist=state.get('header');
	  addedobject[0].colData=prevHeaderlist.map((item)=>item && item.type && item.type.toLowerString()==="checkbox"?true:"defaultvalue");
	  let prevlist =state.get('rowobjects');
      let newlist=prevlist.slice(0,action.index+1).concat(addedobject);
      let newlistb=newlist.concat(prevlist.slice(action.index+1,prevlist.length));
	  return state.set('rowobjects', newlistb);
    default:
      return state
  }
}

export default table
