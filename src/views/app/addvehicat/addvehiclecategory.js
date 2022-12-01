import { Colxx } from "components/common/CustomBootstrap";
// import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import IntlMessages from "helpers/IntlMessages";
import React, { Component, Fragment } from "react";
import { Card, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import {
  Button,
  CardBody,
  CardHeader,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { DropzoneComponent } from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";

import FormikCustomComponents from "containers/forms/FormikCustomComponents";

import { adddvehiclecategory } from "./apiCalls";

export default class addvehcilecategory extends Component {
  ReactDOMServer = require("react-dom/server");
  fUp = false;
  text = "";

  componentConfig = {
    iconFiletypes: [".jpg", ".png", ".gif"],
    showFiletypeIcon: true,
    postUrl: "/uploadHandler",
  };

  constructor(props) {
    super(props);

    this.state = {
      //   collapse: false,
      loading: false,
      list: [],
      editinitValues: {
        djsConfig: {
          uploadMultiple: false,
          maxFilesize: 1,
          params: {
            id: this.props.id,
            name: this.props.name,
          },
          autoProcessQueue: false,
        },
        eventHandlers: { addedfile: (file) => console.log(file) },
        // componentConfig : {iconFiletypes: ['.jpg', '.png', '.gif','.csv','.txt'],
        //  },
        isaccepted: false,
        isbulk: false,
      },
    };
  }
  formFields = [
    {
      label: "label.dropZone",
      name: "dropZone",
      // className: 'mb-10',
      type: "dropZone",
      disabled: false,
      colxx: "9",
    },
  ];

  getFields() {
    if (this.state.list.length === 0) {
      alert("Please Upload Image");
    } else if (this.text === "") {
      alert("Enter Text");
    } else {
      this.setState({ loading: true });
      console.log(this.state.list)
      adddvehiclecategory(
        this.text,
        this.state.list,
        this.onSuccess,
        this.onFailure
      );
      // console.log(this.state.list);
    }
  }
  coTe(t) {
    if (t !== "") {
      this.text = t;
    } else {
      this.text = "";
    }
  }

  onSuccess = (response) => {
    console.log(response);
  };
  onFailure = (response) => {
    console.log(response);
  };
  //   u = (req, res) => {
  //     console.log(req);
  //   };

  //   componentConfig = {
  //     iconFiletypes: [".jpg", ".png", ".gif"],
  //     showFiletypeIcon: true,
  //     postUrl: "u",
  //   };

  render() {
    let eventHandlers = {
      addedfile: (file) => console.log("FileofDropzone", file),
    };
    let dropzoneComponentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      postUrl: "no-url",
      //   postUrl: "https://httpbin.org/post",
    };
    let dropzoneConfig = {
      maxFiles: 1,
      acceptedFiles: "image/*",
      autoProcessQueue: false,
      thumbnailHeight: 160,
      maxFilesize: 10,
      uploadMultiple: false,
      previewTemplate: this.ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview mb-3">
          <div className="d-flex flex-row ">
            <div className="p-0 w-30 position-relative">
              <div className="dz-error-mark">
                <span>
                  <i />{" "}
                </span>
              </div>
              <div className="dz-success-mark">
                <span>
                  <i />
                </span>
              </div>
              <div className="preview-container">
                {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                <img data-dz-thumbnail className="img-thumbnail border-0" />
                <i className="simple-icon-doc preview-icon" />
              </div>
            </div>
            <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
              <div>
                {" "}
                <span data-dz-name />{" "}
              </div>
              <div className="text-primary text-extra-small" data-dz-size />
              <div className="dz-progress">
                <span className="dz-upload" data-dz-uploadprogress />
              </div>
              <div className="dz-error-message">
                <span data-dz-errormessage />
              </div>
            </div>
          </div>
          <a href="#/" className="remove" data-dz-remove>
            {" "}
            <i className="glyph-icon simple-icon-trash" />{" "}
          </a>
        </div>
      ),
      headers: { "My-Awesome-Header": "header value" },
    };
    return (
      <>
        <Card>
          {/* <CardHeader></CardHeader> */}
          <CardBody>
            <Colxx xxs="12">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <h1>
                    <IntlMessages id="AddCategory" />
                  </h1>
                </div>
              </div>
            </Colxx>

            <div>
              <Input
                type="text"
                name="date"
                placeholder="Enter Vehicle Category"
                className="icon form-control"
                style={{
                  width: "50%",
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => this.coTe(e.target.value)}
              />
              <br></br>

              <DropzoneComponent
                // className={className}
                // djsConfig={this.state.djsConfig}
                // config={this.state.componentConfig}
                eventHandlers={{
                  addedfile: (file) => {
                    console.log(file);
                    //   if (file.accepted) {
                    //     console.log("Accepted");
                    //   }
                    if (!this.fUp) {
                      this.state.list = file;
                      this.fUp = true;
                    }
                    // console.log(this.state.list);
                  },
                  removedfile: (file) => {
                    if (file.accepted) {
                      this.state.list = [];
                      this.fUp = false;
                    }
                    // console.log(file);
                  },
                  processingmultiple: false,
                }}
                config={dropzoneComponentConfig}
                djsConfig={dropzoneConfig}
                // className={'p-10 m-100'}
              />
              <br></br>
              <div className="text-right">
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => this.getFields()}
                >
                  <IntlMessages id="submit-button" />
                </Button>
              </div>
            </div>
            {/* <DropzoneComponent
              config={this.componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            /> */}
            {/* <form>
              <div>
                <Input
                  type="text"
                  name="date"
                  placeholder="Enter Vehicle Category"
                  className="icon form-control"
                  style={{
                    width: "50%",
                    borderRadius: "10px",
                    padding: "0.5rem",
                    position: "relative",
                    left: "15px",
                  }}
                  required={true}
                  onChange={(e) => this.coTe(e.target.value)}
                />
              </div>
              <Row>
                <Colxx xxs="12">
                  <FormikCustomComponents
                    formFields={this.formFields}
                    validationSchema={this.validationSchema}
                    initialValues={this.state.editinitValues}
                    // handleSubmit={this.handleTab}
                    // key = {"knowYourUserForm"}
                    // formName = {"knowYourUserForm"}
                  />
                </Colxx>
              </Row>
            </form> */}
            {/* <div className="text-right">
              <Button
                color="primary"
                type="submit"
                onClick={() => this.getFields()}
              >
                <IntlMessages id="submit-button" />
              </Button>
            </div> */}
            {/* <div>
              <CustomInput
                type="file"
                id="exampleCustomFileBrowser4"
                name="customFile"
              />
            </div>
            <InputGroupAddon addonType="append">
              <Button outline color="primary">
                <IntlMessages id="input-groups.button" />
              </Button>
            </InputGroupAddon> */}
          </CardBody>
        </Card>
      </>
    );
  }
}

// const formFields = [
//   {
//     label: "label.purOfPayment",
//     name: "purOfPayment",
//     className: "p-10",
//     type: "select",
//     disabled: false,
//     colxx: "4",
//   },
//   {
//     label: "label.dropZone",
//     name: "dropZone",
//     // className: 'mb-10',
//     type: "dropZone",
//     disabled: false,
//     colxx: "9",
//   },
// ];

// var componentConfig = {
//   iconFiletypes: [".jpg", ".png", ".gif"],
//   showFiletypeIcon: true,
//   postUrl: "u",
// };

// let djsConfig = {
//   uploadMultiple: false,
//   maxFilesize: 1,
// };
