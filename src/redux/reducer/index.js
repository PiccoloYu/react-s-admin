import { combineReducers } from 'redux';
import { openAside, animat, matchedlist, device } from "../todo/app";
import { visitedTabs, Routers, _thisCurrent, whether } from "../todo/tabview";
import { fields } from "../todo/user";

const todoApp = combineReducers({
  openAside,
  visitedTabs,
  Routers,
  _thisCurrent,
  animat,
  matchedlist,
  whether,
  device,
  fields
});

export default todoApp
