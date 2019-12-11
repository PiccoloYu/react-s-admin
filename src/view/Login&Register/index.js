import React, { Component } from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { connect } from 'react-redux';
import { isFields, isLogin } from "../../redux/action/useraction";
import { Form } from 'antd';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _thisfrom: 'login',
      registerdata: {
        username: {
          value: '123'
        },
        password: {
          value: '123'
        },
        againpassword: {
          value: '123'
        }
      }
    };
  }

  handleFormChange = changedFields => {
    this.props.isFields(changedFields);

    /*const { fields } = this.props;
    console.log(fields)*/
    /*this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));*/
  };

  handleChackform = (val) => {
    this.setState({
      _thisfrom: val
    })
  }

  handleSubmit = e => {
    this.props.isLogin();
    e.preventDefault();
    /*this.props.form.validateFields((err, values) => {
      if (!err) {
        Login(values).then((res) => {
          console.log(res.data)
        });
        //console.log('Received values of form: ', values);
      }
    });*/
  };

  render() {
    //const { getFieldDecorator } = this.props.form;
    const { fields } = this.props;
    const { _thisfrom, registerdata } = this.state;
    //const { fields } = this.state;
    //console.log(getFieldValue(['username','password']))
    return (
      <div className="login-container">
        <div className="loginForm">
          <h1>REACT ADMIN</h1>
          {<Form onSubmit={this.handleSubmit} className="login-form">
            {_thisfrom === 'login'
              ? <LoginForm  {...fields} onChange={this.handleFormChange} handleChackform={this.handleChackform} />
              : <RegisterForm  {...registerdata} onChange={this.handleFormChange} handleChackform={this.handleChackform} />
            }
          </Form>}
        </div>
      </div>
    );
  }
}


/*export default Form.create({
  name: 'normal_login'
})(login);*/

const mapStateToProps = (state, ownProps) => {
  return {
    userName: state.userName,
    passWord: state.passWord,
    rememBer: state.rememBer,
    fields: state.fields
  }
}

export default connect(
  mapStateToProps, {
  isFields,
  isLogin
}
)(login)