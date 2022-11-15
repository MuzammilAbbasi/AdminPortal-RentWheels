import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink, Redirect, history } from "react-router-dom";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { loginUserSuccess, loginUserError } from "../../redux/auth/actions";

import { login } from "./apiCalls";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onSuccess = (response) => {
    console.log(response);
    this.setState({ loading: false });
    const { status, data } = response;
    const { history } = this.props;
    if (status === 200) {
      // loginUserSuccess(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      // // history.push('/');
      if (data.firstLogin) {
        history.push({
          pathname: "/user-operations/changepassword",
          state: data.firstLogin
        });
      } else {
        history.push("/");
      }
    }
  };

  onFailure = (error) => {
    this.setState({ loading: false });
  };

  onUserLogin = (values) => {
    this.setState({ loading: true });
    if (values.userId !== "" && values.password !== "") {
      // this.props.loginUser({userId: values.userId, password: values.password, history})
      login(values, this.onSuccess, this.onFailure);
    }
  };

  validateUserId = (value) => {
    let error;
    if (!value) {
      error = "Please enter your User Id";
    } else if (!/^[A-Za-z0-9]+$/i.test(value)) {
      error = "Invalid User Id";
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(value) === false) {
      error =
        "Password must contain at least 8 characters,including UPPERCASE letter, lowercase letter,number and a special character";
    }
    return error;
  };


  // componentDidUpdate() {
  //   if (this.props.error) {
  //     NotificationManager.warning(
  //       this.props.error,
  //       "Login Error",
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  //   }
  // }

  // componentDidMount() {
  //   if (this.props.history.location.state){
  //     NotificationManager.info("Please Login with your new Password","Login Again");
  //   }
  // }
  
  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">
                Welcome to National Bank
              </p>
              <p className="white mb-0">
                Please use your credentials to login.
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>

              <Formik
                initialValues={{ userId: "", password: "" }}
                onSubmit={this.onUserLogin}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.userId" />
                      </Label>
                      <Field
                        className="form-control"
                        name="userId"
                        validate={this.validateUserId}
                      />
                      {errors.userId && touched.userId && (
                        <div className="invalid-feedback d-block">
                          {errors.userId}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <NavLink to={`/user/forgot-password`}>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink> */}
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.state.loading ? "show-spinner" : ""
                        }`} // For
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="user.login-button" />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
