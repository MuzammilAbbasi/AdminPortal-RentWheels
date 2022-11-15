import React from 'react';

import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
 
function CustomTBodyComponent(props) {
  return (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {props.children}
      </PerfectScrollbar>
    </div>
  );
}
 

export default CustomTBodyComponent;