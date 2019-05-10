import { fetchItems,deleteItem,createItem,editItem } from "../Services/api";
import {routerRedux} from "dva/router";
import pathToRegExp from 'path-to-regexp';
export default {
  namespace: "posts",
  state: {
    items:[]
  },
  reducers: {
    saveItems(state, { payload }) {
      return { ...state, items:payload };
    },
    delItem(state,{payload})
    {
      const previousState = state.items;
      var newState = previousState.filter((item)=>item.id!==payload);
      return {...state,items:newState};
    },
    createPost(state,{payload}){
      //Since fake api returns the id as 101 always
      const item = {userId:payload.userId,id:state.items.length+1,title:payload.title};
      const newStateItems = [...state.items];
      newStateItems[state.items.length] = item;
      console.log(newStateItems);
      return{...state,items:newStateItems};
    },
    editPost(state,{payload}){
      console.log(payload);
      const {id} = payload;
      const newStateItems = [...state.items];
      newStateItems[id-1] = payload;
      return{...state,items:newStateItems};
    }
  },
  effects: {
    *getItems(action, { call, put }) {
      const items = yield call(fetchItems);
      yield put({ type: "saveItems", payload: items.data });
    },

    *deleteItem({payload},{call,put}){
      call(deleteItem);
      yield put({type:"delItem",payload:payload})
    },

    *postItem({payload},{call,put}){
      const {data} = yield call(createItem,payload);
     
      if(data)
      {
        yield put({type:"createPost",payload:data});
        yield put(routerRedux.push('/'));
      }
    },

    *editItem({payload},{call,put}){
      const {data} = yield call(editItem,payload);
      const combinedData = {id:payload.id,userId:data.userId,title:data.title}
      if(data)
      {
        yield put({type:"editPost",payload:combinedData});
        yield put(routerRedux.push('/'));
      }
    }
  },

  //every time it visits executions starts from history.listem acting as listener function.
  subscriptions: {
    setup: function ({history, dispatch}) {
      let locate = false;
        history.listen(location => {
            if (pathToRegExp('/').exec(location.pathname)) {
              if(!locate){
                dispatch({
                  type: 'getItems',
              });
              locate =true;
              } 
            }
        });
    }
}
};
