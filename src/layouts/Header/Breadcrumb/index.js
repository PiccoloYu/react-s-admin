import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from "react-router-dom";

const MyBreadcyrumb = ({ matchedlist }) => {
  return (
    <Breadcrumb>
      {matchedlist.map((crumb) => {
        if (crumb.path === '/app/home') {
          return (
            <Breadcrumb.Item key={crumb.path}>
              <Link to={crumb.path}>
                {crumb.name}
              </Link>
            </Breadcrumb.Item>
          )
        }
        return (
          <Breadcrumb.Item key={crumb.path}>{crumb.name}</Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default MyBreadcyrumb;