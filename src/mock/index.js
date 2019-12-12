import Mock from 'mockjs';

const tokens = {
  admin: {
    token: 'admin-mytoken'
  },
  editor: {
    token: 'editor-mytoken'
  }
};

const userInfo = {// 'password': '123456',
  'username': 'admin',
  'password': '123456',
  'remember': true
};

Mock.mock('http://localhost:3000/user/logout', 'get', function(options) {
  return {
    code: 200,
    data: 'success'
  };
});

Mock.mock('http://localhost:3000/user/login', 'get', function (options) {
  const data = JSON.parse(options.body);
  const token = tokens[data['username']];
  const a = Mock.valid(userInfo, data);
  if (token) {
    if (a.length === 0) {
      return {
        code: 200,
        token: token.token,
        message: 'login successful!'
      };
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i].path[1] === 'username' || a[i].path[1] === 'password') {
          return {
            code: 401,
            message: 'Incorrect username or password!'
          };
        } else if (a[i].path[1] === 'code') {
          return {
            code: 402,
            message: 'Verification code error!'
          };
        } else {
          return {
            code: 401,
            message: 'Incorrect username or password!'
          }
        }
      }
    }
  } else {
    return {
      code: 401,
      message: 'Incorrect username or password!'
    };
  }
});