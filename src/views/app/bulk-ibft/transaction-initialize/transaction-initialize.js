import React, { Component } from "react";
import ReactTable from "react-table";

import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import { CustomInputElement } from "components/custom/customInput";
import CustomSelect from "components/custom/customSelect";
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx , Separator } from "components/common/CustomBootstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";


import {
  formFields,
  validationSchema
} from "./form/formmeta";
import { transformToObject } from "helpers/Utils";
// import { fetchIps, updateIps } from "./apiCalls";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  CardSubtitle,
  FormText,
  Form,
  Collapse,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import { NavLink } from "react-router-dom";
import { date } from "yup";

export default class fundTransferTransactionInitialize extends Component {

    constructor(props) {
        super(props);
    
        this.mouseTrap = require("mousetrap");
    
        this.state = {
        //   collapse: false,
          editinitValues: {
            djsConfig: {
              uploadMultiple: true,
              maxFilesize: 11,
              params: {
                id: this.props.id,
                name: this.props.name,
              },
              autoProcessQueue: false
            },
            eventHandlers : { addedfile: (file) => console.log(file) },
            // componentConfig : {iconFiletypes: ['.jpg', '.png', '.gif','.csv','.txt'],
          //  },
            isaccepted: false,
            isbulk: true,
          }
            
        };
      }
    render() {
        const { match } = this.props;
        console.log(this.props, "<<+Props");
        return (
            <Colxx xxs="12">
                <div className="mb-3">
                    <div className="d-flex align-items-center">
                        <h1
                        // style={{
                        //   color: "#23527c",
                        //   cursor: "pointer",
                        //   fontWeight: "bold",
                        // }}
                        >
                        <IntlMessages id="menu.transferinitialize" />
                        </h1>
                        <Breadcrumb match={match} />
                    </div>
                </div>
                <Card>
            <CardBody>
              <Row>
                <Colxx  xxs="12">
                  <FormikCustomComponents
                    formFields={formFields}
                    validationSchema={validationSchema}
                    initialValues={this.state.editinitValues}
                    // handleSubmit={this.handleTab}
                    // key = {"knowYourUserForm"}
                    // formName = {"knowYourUserForm"}
                  />
                  
                </Colxx>
              </Row>
            </CardBody>
          </Card>
            </Colxx>
        )
    }
}
