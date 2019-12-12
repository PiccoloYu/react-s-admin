export const isFields = fields => {
  return {
    type: 'IS_FIELDS',
    fields
  }
}

export const isLogin = fields => {
  return {
    type: 'IS_LOGIN',
    fields
  }
}

export const isLogout = fields => {
  return {
    type: 'IS_LOGOUT',
    fields
  }
}
