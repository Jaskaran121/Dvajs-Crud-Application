import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { connect } from "dva";
class EditForm extends React.Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.props.location.state.item);
    this.props.form.validateFieldsAndScroll((err, values) => {
        const id = this.props.location.state.item.id;
       const item = {id,...values};
      if (!err) {
      //console.log("Received values of form: ", item);
       this.props.dispatch({type:"posts/editItem",payload:item});
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 4
          
         }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 20,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const {userId,title} = this.props.location.state.item;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="UserId">
          {getFieldDecorator("UserId", {
            initialValue: userId,
            rules: [
              {
                required: true,
                message: "Please input a UserID"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            initialValue: title,
            rules: [
              {
                required: true,
                message: "Please input a title!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Edit
          </Button> 
        </Form.Item>
      </Form>
    );
  }
}

const WrappedFormEdit = Form.create({ name: "register" })(
  EditForm
);

const mapStateToProps = state =>{
  return{
    postItem:state.posts.editItem,
  }
}
export default connect(mapStateToProps)(WrappedFormEdit);
