import React from "react";
// import { Menu } from 'antd';
import Item from "./Item";
//const { SubMenu } = Menu;

const SubMenuItem = ({Menu, mykey, title, path }) => {

  return (
    <Menu.Item key={mykey} >
      <Item path={path} title={title} />
    </Menu.Item>
  )
}

export default SubMenuItem;