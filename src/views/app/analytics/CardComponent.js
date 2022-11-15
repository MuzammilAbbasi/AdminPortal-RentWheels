import React,{useState} from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  // Form,
  FormGroup,
  Input,
  Label,
  Button,
  Collapse,
  CustomInput,
  Badge,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
export const CardComponent = (props) => {
    const thousandSeparator = (number) => {
      return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  return (
    <Colxx xxs="12" xs="12" sm="12" md="12" lg="6" xl="6">
      <Card className="d-flex flex-row mb-3">
        <div className="pl-2 d-flex flex-grow-1">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row flex-sm-row flex-md-row justify-content-between min-width-zero align-items-lg-center ">
            <p className="list-item-heading mb-1 truncate w-40 w-sm-100">
              {props?.title}
            </p>

            <p className="mb-1 list-item-heading w-25 w-sm-100">
              {props?.count ? thousandSeparator(props?.count) : 0}
            </p>
            <p className="mb-1 list-item-heading w-25 w-sm-100">
              {props.volume ? thousandSeparator(props?.volume) : 0}
            </p>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};
