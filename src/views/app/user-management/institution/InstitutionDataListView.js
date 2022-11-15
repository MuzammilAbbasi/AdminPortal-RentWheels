import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";

const InstitutionDataListView = ({ product, isSelect, collect, onCheckItem, toggleEditModal }) => {
  return (
    <Colxx xxs="12" className="mb-2">
      <ContextMenuTrigger id="menu_id" data={product.code} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, product.code)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="mb-1 text-muted w-15 w-sm-100">
                {product.code}
              </p>
              <NavLink to={`?p=${product.code}`} onClick={() => toggleEditModal(product.code)} className="w-30 w-sm-100">
                <p className="mb-1">
                  {product.descr}
                </p>
              </NavLink>
              <div className="w-20 w-sm-100">
                <Badge color={product.institutionStatus.value === "01" ? "primary" : "secondary"} pill>
                  {product.institutionStatus.label}
                </Badge>
              </div>
              <p className="mb-1 text-muted w-25 w-sm-100">
                {product.createdDateTime}
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4 w-10 w-sm-100">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.code}`}
                checked={isSelect}
                onChange={() => { }}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(InstitutionDataListView);
