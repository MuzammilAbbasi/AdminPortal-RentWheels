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
import md5 from "md5";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config"
import LoadingOverlay from "components/custom/LoadingOverlay"


import { getHeaders } from '../../../constants/requestHeaders';

class ChangePasswordFormik extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");
    this.state={
      showLoadingOverlay: false,
    }
  }

   url = `${config.url.backoffice}${config.endpoint.backoffice.changeUserPassword}`;

  handleSubmit = (values, { setSubmitting }) => {
    const { password,newPassword,confirmPassword } = values;
    if(password === newPassword){
      NotificationManager.error("Old and new Passwords should not be same","Same Password",2000);
      return;
    }
    this.setState({ showLoadingOverlay: true });
    const hashedPas = {
      password: md5(password),
      newPassword: md5(newPassword),
      confirmPassword: md5(confirmPassword),
    }
    axios.put(this.url,hashedPas,getHeaders())
      .then(res => {
        if(res.status === 200) {
           setTimeout(() => {
           NotificationManager.success("Your password has been changed","Password changed");
           this.setState({ showLoadingOverlay: false })
           this.handleLogout();
           setTimeout(() => {
             NotificationManager.info("Please Login Again with your new Password","Login Again");
           },2000)
        },1500)
        }
     }).catch(err => {
         this.setState({
           showLoadingOverlay: false
         })
          NotificationManager.error(err.response.data.message,"Invalid password",2000);
     })
  };

  goHome = (values) => {
    window.location.replace('/app/dashboard/home');
  };

  passwordSchema =  Yup.string()
  .min(8, "Too Short!")
  .max(20, "Too Long!")
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
  "Password must contain at least 8 characters,including UPPERCASE letter, lowercase letter,number and a special character")
  .required("Please enter your new password!");


  handleLogout = () => {  
    sessionStorage.clear();
    this.props.history.replace('/user/login');
  };
  
  componentDidMount(){
    const {firstLogin} = JSON.parse(sessionStorage.getItem("user"));
    if(firstLogin){
        NotificationManager.info("Please Change your Password","Change Password");
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });
    }
  }

  render() {
    console.log(this.props);
    const {firstLogin} = JSON.parse(sessionStorage.getItem("user"));
    const { match } = this.props;
    const {showLoadingOverlay} = this.state;
    // console.log(this.props.location.state.detail);

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
      },
      {
        label: "label.newpassword",
        name: "newPassword",
        type: "password",
        maxLength: "50",
        disabled: false,
      },
      {
        label: "label.confirmnewpasswordpassword",
        name: "confirmPassword",
        type: "password",
        maxLength: "50",
        disabled: false,
      },
    ];

    const shape = {
      password: Yup.string()
        .min(8, "Too Short!")
        .max(20, "Too Long!")
        .required("Please enter your old password!"),
      newPassword:this.passwordSchema,
      confirmPassword: this.passwordSchema.oneOf(
        [Yup.ref("newPassword"),null],
        "Both Passwords should be same"
      )
    };

    const validationSchema = Yup.object().shape(shape);

    return (
      <Fragment>
        {  showLoadingOverlay && <LoadingOverlay style={{ zIndex: 2000 }} /> }
        <div>
          <div className="mb-2 d-flex">
            <h1>
              <IntlMessages id="menu.changepassword" /> 
            </h1>
            {
              !firstLogin && (
                <Breadcrumb match={match} /> 
              )
            }
          </div>
          <Colxx lg="4 mx-auto">
            <Card className="mb-4 mx-auto mt-5">
              <CardBody className="p-2">
                <FormikCustomComponents
                  key={"changePasswordForm"}
                  handleSubmit={this.handleSubmit}
                  toggleModal={this.goHome}
                  formFields={formFields}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  formName={"changePasswordForm"}
                  cancelButton={!firstLogin ? "go-back-button" : undefined}
                />
              </CardBody>
            </Card>
          </Colxx>
        </div>
      </Fragment>
      
    );
  }
}

export default ChangePasswordFormik;
