const defaultState = false;

const openAside = (state = defaultState, action) => {
  if (action.type === 'IS_OPEN') {
    return action.openAside;
  }
  return state;
}

const animat = (state = 'forward', action) => {
  if (action.type === 'IS_ANIMAT') {
    return action.animat;
  }
  return state;
}

const matchedlist = (state = '', action) => {
  if (action.type === 'IS_MATCHEDLIST') {
    return [...action.matchedlist];
  }
  return state;
}

const device = (state = 'desktop', action) => {
  if (action.type === 'IS_DEVICE') {
    return action.device;
  }
  return state;
}



export { openAside, animat, matchedlist, device };
