import React from 'react';
import { Login, Logout } from "../../api/user";
import { notification, Icon } from 'antd';
import history from "../../utlis/history";
import { setToken, removeToken } from "../../utlis/auth";
import { isNull } from "../action/tabaction";

const defields = {
  username: {
    value: 'admin'
  },
  password: {
    value: '123456'
  },
  remember: {
    value: true
  }
}


const fields = (state = defields, action) => {
  switch (action.type) {
    case 'IS_FIELDS':
      return {
        ...state,
        ...action.fields,
      };
    case 'IS_LOGIN':
      let item = {};
      Object.keys(state).forEach(
        (key) => {
          item[key] = state[key].value
        }
      )
      Login(item).then((res) => {
        if (res.data.code === 200) {
          notification.open({
            message: '登录成功！',
            description: '恭喜登录成功.',
            icon: <Icon type="smile" style={{ color: 'green' }} />,
          });
        }
        setToken(res.data.token)
        setTimeout(() => {
            history.push('/app/home');
        }, 1000);
      })
      return state;
    case 'IS_LOGOUT':
      Logout().then((res) => {
        if (res.data.code === 200) {
          removeToken();
          isNull();
          setTimeout(() => {
            history.push('/');
          }, 1000);
        }
      })
      return state;
    default:
      return state;
  }

}

export { fields };