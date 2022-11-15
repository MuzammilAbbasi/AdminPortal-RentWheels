import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";

class ForgotPassword extends Component {

  onForgotPassword = (values) => {
    if (!this.props.loading) {
      if (values.userId !== "") {
        this.props.forgotPassword(values, this.props.history);
      }
    }
  }

  validateUserId = (value) => {
    let error;
    if (!value) {
      error = "Please enter your User Id";
    } else if (!/^[A-Za-z0-9]+$/i.test(value)) {
      error = "Invalid User Id";
    }
    return error;
  }

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Forgot Password Error",
        3000,
        null,
        null,
        ''
      );
    }
  }


  render() {

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">Welcome to Micro Payment Gateway Module</p>
              <p className="white mb-0">
                Please use your User Id to reset your password. <br />
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.forgot-password" />
              </CardTitle>

              <Formik
                initialValues={{userId: ''}}
                onSubmit={this.onForgotPassword}>
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

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/forgot-password`}>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label"><IntlMessages id="user.reset-password-button" /></span>
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(
  mapStateToProps,
  {
    forgotPassword
  }
)(ForgotPassword);

