import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';

const RegisterForm = Form.create({
  name: 'register_state',
  onFieldsChange(props, changedFields) {

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
      againpassword: Form.createFormField({
        ...props.againpassword,
        value: props.againpassword.value,
      })
    }
  },
  onValuesChange(_, values) {

  }
})(props => {
  const { getFieldDecorator } = props.form;

  let checkRegister = () => {
    props.handleChackform('login')
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
        {getFieldDecorator('againpassword', {
          rules: [{ required: true, message: '请重复您的密码！' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="AgainPassword"
          />,
        )}
        <Button type="primary" htmlType="submit" className="login-form-button">
          注册
          </Button>
        Or <span className="spanBut" onClick={checkRegister}>返回登陆</span>
      </Form.Item>
    </div>
  )
})


export default connect(
)(RegisterForm)