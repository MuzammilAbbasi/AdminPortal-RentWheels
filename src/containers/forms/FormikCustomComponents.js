import React, { Component, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCheckbox,
  FormikRadioButtonGroup,
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker,
  DateRangeFormikDatePicker,
  FormikDropZone,
} from "./FormikFields";
import CheckboxTree from "react-checkbox-tree";
import { isFieldRequired } from "helpers/Utils";
import { FormGroup, Label, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import IntlMessages from "../../helpers/IntlMessages";

import { Colxx, Separator } from "components/common/CustomBootstrap";
import "assets/css/common/datepicker.override.css";
import MaskedInput from "react-text-mask";
// import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
class FormikCustomComponents extends Component {

  render() {
    const {
      handleSubmit,
      toggleModal,
      formFields,
      initialValues,
      validationSchema,
      formName,
      generic,
      cancelButton,
      buttonFields,
      iscallcenterAccepted,
      isaccepted,
      call,
      flag,
      profileSync,
      reject,
      approve,
      temporaryBlock,
      permanentBlock,
      isSuperVisorAccepted
    } = this.props;
 
    function getButtons(setFieldValue, handleSubmit) {
            return (
        <div className="text-right">
          {buttonFields.map((button) => {
          
            return (
              <Button
                key={button.label}
                className={button.className}
                color={button.color}
                outline={button.outline}
                onClick={() => {
                  setFieldValue(
                    button.field?.fieldName,
                    button.field?.value,
                    false
                  );
                  handleSubmit();
                }}
              >
                <IntlMessages id={button.label} />
              </Button>
            );
          })}
          {"  "}
        </div>
      );
    }

    function getFormField(
      values,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
      handleChange
    ) {
      const renderedFields = [];
      const CnicNumberMask = [
        /^[0-9+]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9+]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9]$/,
      ];
      Object.values(formFields).forEach((field) => {
        renderedFields.push(
          <Colxx key={field.name} sm={field.colxx || "12"}>
            {/* <Colxx className="col-sm-8"></Colxx> */}
            {/* // <Colxx sm={{ offset:5}}> */}
            <FormGroup
              className={
                isFieldRequired(validationSchema, field.name)
                  ? "error-l-100 required"
                  : "error-l-100"
              }
              key={field.name}
            >
              {/* <Label> */}
                <IntlMessages id={field.label} />
                {field.sublabel && (
                  <small className="m-1">
                    <IntlMessages id={field.sublabel} />
                  </small>
                )}
              {/* </Label> */}

              {field.type === "textboxcnic" && (
                <Field
                  className="form-control"
                  name={field.name}
                  id={field.name}
                  disabled={field.disabled}
                  maxLength={field.maxLength}
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      name={field.name}
                      mask={CnicNumberMask}
                      id={field.name}
                      placeholder="Enter your Cnic number"
                      className="form-control"
                      disabled={field.disabled}
                      maxLength={field.maxLength}
                      // type="textboxcnic"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // className={
                      //   errors.phone && touched.phone
                      //     ? "text-input error"
                      //     : "text-input"
                      // }
                    />
                  )}

                  // value={initialValues[field?.name]}
                />
              )}
              {field.type === "textbox" && (
                <Field
                  className="form-control"
                  name={field.name}
                  id={field.name}
                  disabled={field.disabled}
                  maxLength={field.maxLength}
                  // value={initialValues[field?.name]}
                />
              )}
              {field.type === "password" && (
                <Field
                  className="form-control"
                  type="password"
                  name={field.name}
                  id={field.name}
                  disabled={field.disabled}
                  maxLength={field.maxLength}
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  className="form-control"
                  type="textarea"
                  name={field.name}
                  id={field.name}
                  disabled={field.disabled}
                  maxLength={field.maxLength}
                  rows="4"
                  cols="50"
                />
              )}
              {field.type === "date" && (
                
                <DatePicker
                  className="form-control"
                  autoComplete="off"
                  // selectsRange={true}
                  name={field.name}
                  id={field.name}
                  showYearDropdown
                  // showMonthDropdown
                  dropdownMode="scroll"
                  disabled={field.disabled}
                  selected={values[field.name]}
                  dateFormat={field.format || "dd-MM-yyyy"}
                  onChange={(selectedDate) => {
                    setFieldValue(field.name, selectedDate);
                  }}
                  placeholderText="Select Date"
                />
              )}
              {field.type === "rangeDate" && (
                <DateRangeFormikDatePicker
                  name={field.name}
                  id={field.name}
                  showYearDropdown
                  disabled={field.disabled}
                  className="form-control"
                  selected={values[field.name]}
                  onChange={(val) => {
                    
                    setFieldValue(field.name, val);
                  }}
                  // dateFormat="dd.MM.yyyy"
                  // selectsStart
                  // minDate={new Date()}
                  // onChange={this.handleChangeStart}
                />
              )}
              {field.type === "number" && (
                <Field
                  className="form-control"
                  type="number"
                  name={field.name}
                  id={field.name}
                  disabled={field.disabled}
                  maxLength={field.maxLength}
                />
              )}
              {field.type === "select" && (
                <FormikReactSelect
                  name={field.name}
                  id={field.name}
                  value={values[field.name]}
                  options={field.options}
                  onChange={(name, value) => {
                    setFieldValue(name, value);
                    if (field.onChange) field.onChange(name, value);
                  }}
                  onBlur={setFieldTouched}
                  disabled={field.disabled}
                />
              )}
              {field.type === "nodes" && (
                <CheckboxTree
                  name={field.name}
                  id={field.name}
                  nodes={field.options}
                  checked={field.checked}
                  expanded={field.expanded}
                  onCheck={field.onCheck}
                  onExpand={field.onExpand}
                  noCascade
                  showExpandAll
                />
              )}
              {field.type === "dropZone" && (
                <FormikDropZone
                  djsConfig
                  config
                  eventHandlers
                  className={field.className}
                  name={field.name}
                  id={field.name}
                  disabled={field.disabled}
                />
              )}

              {errors[field.name] ? (
                // && touched[field.name]
                <div className="invalid-feedback d-block">
                  {errors[field.name]}
                </div>
              ) : null}
            </FormGroup>
          </Colxx>
        );
      });

      return renderedFields;
    }
    // debugger
    return (
      // if model is generic then default buttons should be 'cancle' and 'submit'
      // && initialValues.isaccepted === undefined)
      
      generic || (initialValues && isaccepted === undefined) ? (
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form
              className="av-tooltip tooltip-label-right mb-2 mt-2"
              key={formName}
              id={formName}
            >
              {/* <button onClick={() => console.log(values)}>sda</button> */}
              <FormGroup row className="mx-auto">
                {getFormField(
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  handleChange
                )}
              </FormGroup>
              {call ? (
                getButtons(setFieldValue, handleSubmit)
              ) : (
                <div className="text-right">
                  {cancelButton && (
                    <Button color="secondary" outline onClick={toggleModal}>
                      <IntlMessages id={cancelButton} />
                    </Button>
                  )}
                  {"  "}
                  <Button color="primary" type="submit">
                    <IntlMessages id="submit-button" />
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      ) : // ) : call === true ? (
      iscallcenterAccepted && isaccepted ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            // handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
            submitForm,
          }) => (
            <Form
              className="av-tooltip tooltip-label-right"
              key={formName}
              id={formName}
            >
              <FormGroup row>
                {getFormField(
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  handleChange
                )}
              </FormGroup>
              <div className="text-right">
                <Button
                  className="m-1 text-right"
                  color="secondary"
                  outline
                  // onClick={() => {
                  //   // setFieldValue("iscallcenterAccepted", false, false);
                  //   // submitForm();
                  // }}
                  onClick={() => profileSync(values)}
                >
                  <IntlMessages id="Profile-button" />
                </Button>
                {"  "}
                <Button
                  className="m-1 text-right"
                  color="warning"
                  outline
                  // onClick={() => {
                  //   // setFieldValue("iscallcenterAccepted", true, false);
                  //   // submitForm();
                  // }}
                  onClick={() => temporaryBlock()}
                >
                  <IntlMessages id="temporary-block-button" />
                </Button>
                {"  "}
                <Button
                  className="m-1 text-right"
                  color="danger"
                  outline
                  // style={{float: "right", margin: "5px"}}
                  onClick={() => permanentBlock()}
                >
                  <IntlMessages id="permanently-block-button" />
                </Button>
              </div>
              {/* getButtons(setFieldValue, submitForm) */}
            </Form>
          )}
        </Formik>
      ) : initialValues.isvirtualAccepted === true ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            // handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
            submitForm,
          }) => (
            <Form
              className="av-tooltip tooltip-label-right"
              key={formName}
              id={formName}
            >
              <FormGroup row>
                {getFormField(
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  handleChange
                )}
              </FormGroup>
              <div className="text-right">
                <Button
                  className="m-1 text-right"
                  color="secondary"
                  outline
                  onClick={() => {
                    setFieldValue("iscallcenterAccepted", false, false);
                    submitForm();
                  }}
                >
                  <IntlMessages id="Profile-button" />
                </Button>
                {"  "}
                <Button
                  className="m-1 text-right"
                  color="warning"
                  outline
                  onClick={() => {
                    setFieldValue("iscallcenterAccepted", true, false);
                    submitForm();
                  }}
                >
                  <IntlMessages id="temporary-block-button" />
                </Button>
                {"  "}
                <Button
                  className="m-1 text-right"
                  color="danger"
                  outline
                  // style={{float: "right", margin: "5px"}}
                  onClick={() => {
                    setFieldValue("iscallcenterAccepted", true, false);
                    submitForm();
                  }}
                >
                  <IntlMessages id="permanently-block-button" />
                </Button>
              </div>
              {/* getButtons(setFieldValue, submitForm) */}
            </Form>
          )}
        </Formik>
      ) : initialValues.isbulk === true ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            // handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
            submitForm,
          }) => (
            <Form
              className="av-tooltip tooltip-label-right"
              key={formName}
              id={formName}
            >
              <FormGroup row>
                {getFormField(
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  handleChange
                )}
              </FormGroup>
              <div className="d-flex">
                <div className="mr-auto p-2">
                  <Button
                    // className="m-1"
                    color="secondary"
                    outline
                    onClick={() => {
                      setFieldValue("isbulk", false, false);
                      submitForm();
                    }}
                  >
                    <IntlMessages id="submit-button" />
                  </Button>
                  {"  "}
                </div>
                <div className="p-2">
                  <Button
                    // className="m-1 text-right"
                    color="warning"
                    outline
                    onClick={() => {
                      setFieldValue("isbulk", true, false);
                      submitForm();
                    }}
                  >
                    <IntlMessages id="Temp-of-bulk" />
                  </Button>
                  {"  "}
                  <Button
                    className="m-1 text-right"
                    color="danger"
                    outline
                    // style={{float: "right", margin: "5px"}}
                    onClick={() => {
                      setFieldValue("isbulk", true, false);
                      submitForm();
                    }}
                  >
                    <IntlMessages id="Uploaded-File-Details" />
                  </Button>
                </div>
              </div>

              {/* getButtons(setFieldValue, submitForm) */}
            </Form>
          )}
        </Formik>
      )  : isSuperVisorAccepted ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            // handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
            submitForm,
          }) => (
            <Form
              className="av-tooltip tooltip-label-right"
              key={formName}
              id={formName}
            >
              <FormGroup row>
                {getFormField(
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  handleChange
                )}
              </FormGroup>
              <div className="d-flex justify-content-end">
                <div className="p-2">
                <Button
                  // className="m-1"
                  color="primary"
                  outline
                  // onClick={() => {
                  //   // setFieldValue("iscallcenterAccepted", false, false);
                  //   // submitForm();
                  // }}
                  onClick={() => approve()}
                >
                  <IntlMessages id="approve.button" />
                </Button>
                {"  "}
                </div>
                <div className="p-2">
                <Button
                  // className="m-1"
                  color="secondary"
                  outline
                  // onClick={() => {
                  //   // setFieldValue("iscallcenterAccepted", true, false);
                  //   // submitForm();
                  // }}
                  onClick={() => reject()}
                >
                  <IntlMessages id="reject.button" />
                </Button>
                  {"  "}
                </div>
              </div>

            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
            submitForm,
          }) => (
            <Form
              className="av-tooltip tooltip-label-right"
              key={formName}
              id={formName}
            >
              <FormGroup row>
                {getFormField(
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  handleChange
                )}
              </FormGroup>
              <div className="text-right">
                <Button
                  className="m-1"
                  color="secondary"
                  outline
                  onClick={() => {
                    setFieldValue("isaccepted", false, false);
                    submitForm();
                  }}
                >
                  <IntlMessages id="reject-button" />
                </Button>
                {"  "}
                <Button
                  color="primary"
                  onClick={() => {
                    setFieldValue("isaccepted", true, false);
                    submitForm();
                  }}
                >
                  <IntlMessages id="approve-button" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )
    );
  }
}
export default FormikCustomComponents;
