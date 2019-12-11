import React from "react";
import { Icon } from 'antd';
import {
  Link
} from "react-router-dom";

const Item = ({ path, title, icon }) => {

  if (path === '') {
    return (
      <span>
        <Icon type={icon} />
        <span>{title}</span>
      </span>
    )
  }
  return (
    <Link to={path}>

      <Icon type={icon} />
      <span>{title}</span>
    </Link>
  )
}

export default Item;