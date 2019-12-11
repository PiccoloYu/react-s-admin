import React from 'react';
import { Form, Input, Icon, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { isFields } from "../../redux/action/useraction";

const LoginForm = Form.create({
  name: 'login_state',
  onFieldsChange(props, changedFields) {
    props.isFields(changedFields);
    //props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
      remember: Form.createFormField({
        ...props.remember,
        value: props.remember.value,
      }),
    };
  },
  onValuesChange(_, values) {
    //console.log(values);
  },
})(props => {
  const { getFieldDecorator } = props.form;

  let checkRegister = () => {
    props.handleChackform('register');
  }

  return (
    <div>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入您的用户名！' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入您的密码！' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住我</Checkbox>)}
        <span className="login-form-forgot">
          忘记密码
              </span>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
          </Button>
        Or <span className="spanBut" onClick={checkRegister}>现在注册!</span>
      </Form.Item>
    </div>
  );
});

const mapStateToProps = (state, ownProps) => {
  return {
    fields: state.fields
  }
}

export default connect(
  mapStateToProps,
  {
    isFields
  }
)(LoginForm)