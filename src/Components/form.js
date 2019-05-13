import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button} from "antd";
import { connect } from "dva";
class RegistrationForm extends React.Component {
  state = {

  };

  handleSubmit = e => {
   e.preventDefault();
    console.log(this.props.form);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       console.log("Received values of form: ", values);
       this.props.dispatch({type:"posts/postItem",payload:values});
       return values;
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="UserId">
          {getFieldDecorator("UserId", {
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
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create({ name: "register" })(
  RegistrationForm
);

const mapStateToProps = state =>{
  return{
    postItem:state.posts.postItem,
    currentItems:state.posts.items
  }
}
export default connect(mapStateToProps)(WrappedForm);
