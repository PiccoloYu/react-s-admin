export const isVisitedTabs = visitedTabs => {
  return {
    type: 'IS_VISITEDTABS',
    visitedTabs
  }
}

export const isAddTabs = addview => {
  return {
    type: 'IS_ADDTABS',
    addview
  }
}

export const isDelTabs = delview => {
  return {
    type: 'IS_DELTABS',
    delview
  }
}

export const isSetTab = thisview => {
  return {
    type: 'IS_SETTAB',
    thisview
  }
}

export const isCurrent = current => {
  return {
    type: 'IS_CURRENT',
    current
  }
}

export const isRouters = Routers => {
  return {
    type: 'IS_ROUTERS',
    Routers
  }
}

/**
 * 存储当前状态
 */
export const isWhether = whether => {
  return {
    type: 'IS_WHETHER',
    whether
  }
}


/**
 * 以下皆为对 tab 的 操作
 */

export const isRefresh = view => {
  return {
    type: 'IS_REFRESH',
    view
  }
}

export const isOther = view => {
  return {
    type: 'IS_OTHER',
    view
  }
}

export const isAll = view => {
  return {
    type: 'IS_ALL',
    view
  }
}

export const isLeft = view => {
  return {
    type: 'IS_LEFT',
    view
  }
}

export const isRight = view => {
  return {
    type: 'IS_RIGHT',
    view
  }
}

export const isNull = view => {
  return {
    type: 'IS_NULL',
    view
  }
}

