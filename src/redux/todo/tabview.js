import config from "../../config";
import history from "../../utlis/history";
import { isWhether } from "../action/tabaction";

const Routers = (state = config.router, action) => {
  if (action.type === 'IS_ROUTERS') {
    return action.Routers;
  }
  return state;
}

let tabs = [];

const visitedTabs = (state = [], action) => {
  switch (action.type) {
    case 'IS_VISITEDTABS':
      if (tabs.some(v => v.fullPath !== action.visitedTabs.fullPath)) {
        tabs.push(action.visitedTabs);
      }
      return [...tabs];
    case 'IS_ADDTABS':
      if (tabs.some(v => v.fullPath === action.addview.fullPath)) {
        return [...tabs];
      } else {
        tabs.push(
          Object.assign({}, action.addview)
        );
        isWhether(true);
        return [...tabs];
      }
    case 'IS_DELTABS':
      new Promise(async resolve => {
        let currentIndex = ChoiceView(action.delview);
        if (currentIndex === 0) {
          return false;
        } else {  // 否则删除除当前 index 为currentIndex 之外的标签
          tabs.splice(currentIndex, 1);
        }
        resolve({
          currentIndex: currentIndex
        });
      }).then(({ currentIndex }) => {
        let nextview = '';
        let tabslist = [...tabs];
        if (!tabslist[currentIndex + 1] && currentIndex + 1 !== tabslist.length) {
          nextview = tabs[currentIndex - 1];
        } else {
          nextview = tabs[currentIndex];
        }
        return nextview;
      }).then((nextview) => {
        if (history.location.pathname === action.delview) {
          if (typeof (nextview) !== 'undefined') {
            history.push(nextview.path);
          } else {
            history.push('/app/home');
          }
        }
      })
      /*for (const [i, v] of tabs.entries()) {
        if (v.path === action.delview) {
          tabs.splice(i, 1);
          break;
        }
      }*/
      return [...tabs];
    case 'IS_REFRESH':  // 刷新
      new Promise(async resolve => {
        let view = '';
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].path === action.view) {
            view = tabs[i];
          }
        }
        resolve({
          view: view
        })
      }).then(({ view }) => {
        const { fullPath } = view;
        //if (fullPath !== '/app/home') {
        history.push('/app/redirect' + fullPath);
        //}
      })

      return [...tabs];
    case 'IS_OTHER':
      new Promise(async resolve => {
        let currentIndex = ChoiceView(action.view);
        if (currentIndex === 0) { // 等于0 时直接删除所有
          tabs.splice(1);
        } else {  // 否则删除除当前 index 为currentIndex 之外的标签
          tabs.splice(currentIndex + 1);
          tabs.splice(1, currentIndex - 1);
        }
        resolve();
      }).then(() => {
        CheckView(action.view);
      })
      return [...tabs];
    case 'IS_ALL':
      new Promise(async resolve => {
        tabs.splice(1);
        resolve();
      }).then(
        () => {
          history.push('/app/home');
        }
      )
      return [...tabs];
    case 'IS_LEFT':
      new Promise(async resolve => {
        let currentIndex = ChoiceView(action.view);
        if (currentIndex > 0) {
          tabs.splice(1, currentIndex - 1);
        }
        resolve();
      }).then(() => {
        CheckView(action.view);
      })
      return [...tabs];
    case 'IS_RIGHT':
      new Promise(async resolve => {
        let currentIndex = ChoiceView(action.view);
        tabs.splice(currentIndex + 1);
        resolve();
      }).then(() => {
        CheckView(action.view);
      })
      return [...tabs];
    case 'IS_NULL':
      tabs = [];
      return tabs;
    default:
      return state;
  }
}

const _thisCurrent = (state = '/app/home', action) => {
  if (action.type === 'IS_CURRENT') {
    return action.current;
  }
  return state;
}

const whether = (state = '', action) => {
  if (action.type === 'IS_WHETHER') {
    return action.whether;
  }
  return state;
}


export { visitedTabs, Routers, _thisCurrent, whether };

const ChoiceView = (view) => {
  let currentIndex = 0;
  tabs.forEach((page, index) => {
    if (page.fullPath === view) {
      currentIndex = index;
    }
  });
  return currentIndex;
}

const CheckView = (view) => {
  if (history.location.pathname !== view) {
    history.push(view);
  }
}