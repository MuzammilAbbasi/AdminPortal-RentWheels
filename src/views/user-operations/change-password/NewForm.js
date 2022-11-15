import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx } from "../../../components/common/CustomBootstrap";
import FormikCustomComponents from "../../../containers/forms/FormikCustomComponents";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { NotificationManager } from "../../../components/common/react-notifications";
import * as Yup from "yup";
import config from "../../../config"

export class NewForm extends Component {
    render() {
        const {firstLogin} = JSON.parse(sessionStorage.getItem("user"));

        const initialValues = {
            password: "",
            newPassword: "",
            confirmPassword: "",
          };
      
          const formFields = [
            {
              label: "label.oldpassword",
              name: "password",
              type: "password",
              maxLength: "50",
              disabled: false,
              colxx: '4'
            },
            {
              label: "label.newpassword",
              name: "newPassword",
              type: "password",
              maxLength: "50",
              disabled: false,
              colxx: '4'
            },
            {
              label: "label.confirmnewpasswordpassword",
              name: "confirmPassword",
              type: "password",
              maxLength: "50",
              disabled: false,
              colxx: '4'
            },
            {
                label: "Date",
                name: "date",
                type: "date",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "Select",
                name: "select",
                type: "select",
                options: [{ value: "01", label: "Active" },
                { value: "03", label: "In-Active" },
                { value: "04", label: "Locked"}],
                disabled: false,
                colxx: '4'
              },
           , {
                label: "label.oldpassword",
                name: "password",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.newpassword",
                name: "newPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              }, {
                label: "label.oldpassword",
                name: "password",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.newpassword",
                name: "newPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.oldpassword",
                name: "password",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.newpassword",
                name: "newPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.oldpassword",
                name: "password",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.newpassword",
                name: "newPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.oldpassword",
                name: "password",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.newpassword",
                name: "newPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.oldpassword",
                name: "password",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.newpassword",
                name: "newPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "label.confirmnewpasswordpassword",
                name: "confirmPassword",
                type: "password",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              },
              {
                label: "Textarea",
                name: "textarea",
                type: "textarea",
                maxLength: "50",
                disabled: false,
                colxx: '4'
              }
          ];

        return (
        <Fragment>
         <div>
         <div className="mb-2 d-flex">
            <h1>
                Form
              {/* <IntlMessages id="" />  */}
            </h1>
            {/* {
              !firstLogin && (
                <Breadcrumb match={match} /> 
              )
            } */}
          </div>
          <div className="mb-2 ">
          <Colxx lg="12">
                <FormikCustomComponents
                  key={"changePasswordForm"}
                  handleSubmit={this. handleSubmit}
                  toggleModal={this.goHome}
                  formFields={formFields}
                  initialValues={initialValues}
                //   validationSchema={validationSchema}
                  formName={"changePasswordForm"}
                  cancelButton={!firstLogin ? "goback-button" : null}
                />
          </Colxx>
          </div>
        </div>
      </Fragment>
        )
    }
}

export default NewForm
