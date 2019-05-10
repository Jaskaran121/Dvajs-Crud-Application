import axios from "axios";

export const fetchItems = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

export const deleteItem = () =>{
  //console.log('reached');
  return axios.delete("https://jsonplaceholder.typicode.com/posts/1");
}

export const createItem = ({UserId,title}) =>{
  //console.log("reached");
  return axios.post("https://jsonplaceholder.typicode.com/posts/",{
    userId:UserId,
    title:title
  })
}

export const editItem = ({id,UserId,title}) => {
    return axios.put(`https://jsonplaceholder.typicode.com/posts/1`,{
      userId:UserId,
      title:title,
    });
}