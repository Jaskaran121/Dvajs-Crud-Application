import React, { Component } from "react";
import { connect } from "dva";
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Button,Table} from 'antd';

class posts extends Component {

  handleDelete = (value) => {
    this.props.dispatch({type:"posts/deleteItem",payload:value});
  }

  buttonStyle = {
    marginLeft:'20px',
    marginBottom:'5px'
  };
  columns = [
    {
      title:'UserId',
      dataIndex :'userId',
      key:'userId'
    },
    {
      title:'Id',
      dataIndex:'id',
      key:'id'
    },
    {
      title:'Title',
      dataIndex:'title',
      key:'title'
    },
    {
      title:'Edit',
      key:'edit',
      //Input params are the dataSource
      render:({id,userId,title})=>(
        <span>
          <Link to={{pathname: '/edit',state: {item: {id,userId,title}}}}>
          <Button type="primary">Edit</Button>
          </Link>
        </span>
      )
    },
    {
      title:'Delete',
      key:'delete',
      //Input params are the dataSource
      render:({id})=>(
        <Button type="danger" onClick={()=>this.handleDelete(id)}>Delete</Button>
      )
    }
  ];

  render() {
    const {getDataState:data} = this.props;
    return (
      <React.Fragment>
        <h1 style={this.postStyle}>Posts {data.length}</h1>
        <Link to="/create">
        <Button type="primary" style={this.buttonStyle}>Create</Button>
        </Link>
        <div>
          {console.log(data)}
          {(data) && <Table columns={this.columns} dataSource={data} rowKey='id'></Table>}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    getItems: state.posts.getItems,
    deleteItem: state.posts.deleteItem,
    getDataState:state.posts.items,
    loggingState:state.posts.logging
  };
};

export default connect(mapStateToProps)(posts);
