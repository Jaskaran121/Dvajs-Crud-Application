import React, { Component } from "react";
import {Table} from 'antd';
class postItems extends Component {
  render() {
    const { id, title,userId } = this.props.post;
    return (
      <div>{id} - 
      {title}
      <br /></div>
    );
  }
}

export default postItems;
