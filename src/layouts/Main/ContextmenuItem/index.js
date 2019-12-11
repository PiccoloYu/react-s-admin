import React from 'react';

const ContextmenuItem = ({ menulist }) => {
  return (
    <div>
      {menulist.map((item) => (
        <li key={item.value} data-value={item.value}>{item.title}</li>
      ))}

    </div>
  );
}

export default ContextmenuItem;