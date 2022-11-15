import React from "react";
import { Card, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";

const getNavLinkIcon = (to, title, icon) => {
  return (
    to ?
      <NavLink to={to}>
        <i className={icon} />
      </NavLink> :
      <i className={icon} />
  );
}

const getNavLinkTitle = (to, title, icon) => {

  return (
    to ?
      <NavLink to={to}>
        <p className="card-text font-weight-semibold mb-0">
          <IntlMessages id={title} />
        </p>
      </NavLink> :
      <p className="card-text font-weight-semibold mb-0">
        <IntlMessages id={title} />
      </p>
  );
}

const getHrefIcon = (to, title, icon) => {
  return (
    to ?
    <a href={to} target="_blank" rel="noopener noreferrer">
        <i className={icon} />
      </a> :
      <i className={icon} />
  );
}

const getHrefTitle = (to, title, icon) => {

  return (
    to ?
      <a href={to} target="_blank" rel="noopener noreferrer">
        <p className="card-text font-weight-semibold mb-0">
          <IntlMessages id={title} />
        </p>
      </a> :
      <p className="card-text font-weight-semibold mb-0">
        <IntlMessages id={title} />
      </p>
  );
}

const IconCard = ({ className = "mb-4", icon, title, value, to, type }) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card >
        <CardBody className="text-center">
          {
            type !== "external" ?
              getNavLinkIcon(to, title, icon) : getHrefIcon(to, title, icon)
          }
          {
            type !== "external" ?
              getNavLinkTitle(to, title, icon) : getHrefTitle(to, title, icon)
          }


          <p className="lead text-center" style={{
            fontSize: '20px'
          }}>{value}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default IconCard;