import React from "react";
import Select from "react-select";
import { CustomInput } from "reactstrap";
import moment from "moment";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropzoneComponent from "react-dropzone-component";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "dropzone/dist/min/dropzone.min.css";
export class FormikReactSelect extends React.Component {
  handleChange = (value) => {
    
    this.props.onChange(this.props.name, value);
  };
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };
  render() {
    return (
      <Select
        className={`react-select ${this.props.className}`}
        classNamePrefix="react-select"
        options={this.props.options}
        isMulti={this.props.isMulti}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
        isDisabled={this.props.disabled}
      />
    );
  }
}

export class FormikCheckboxGroup extends React.Component {
  handleChange = (val) => {
    let valueArray = [...this.props.value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    this.props.onChange(this.props.name, valueArray);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <React.Fragment>
        {options.map((child, index) => {
          return (
            <div
              key={`${name}_${child.value}_${index}`}
              className={`position-relative form-check ${
                inline ? "form-check-inline" : ""
              }`}
            >
              <input
                id={child.value}
                name={name}
                type="checkbox"
                className="form-check-input"
                onChange={() => this.handleChange(child.value)}
                onBlur={this.handleBlur}
                defaultChecked={value.includes(child.value)}
                disabled={child.disabled}
              />
              <label className="form-check-label">{child.label}</label>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
export class FormikCustomCheckboxGroup extends React.Component {
  handleChange = (val) => {
    let valueArray = [...this.props.value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    this.props.onChange(this.props.name, valueArray);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <React.Fragment>
        {options.map((child, index) => {
          return (
            <CustomInput
              key={`${name}_${child.value}_${index}`}
              type="checkbox"
              id={`${name}_${child.value}_${index}`}
              name={child.name}
              label={child.label}
              onChange={() => this.handleChange(child.value)}
              onBlur={this.handleBlur}
              checked={value.includes(child.value)}
              disabled={child.disabled}
              inline={inline}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export const FormikCheckbox = (props) => {
  const handleChange = (event) => {
    props.onChange(props.name, !props.value);
  };
  const handleBlur = () => {
    props.onBlur(props.name, true);
  };
  return (
    <div className={`position-relative form-check form-check-inline`}>
      <input
        name={props.name}
        type="checkbox"
        className="form-check-input"
        onChange={handleChange}
        onBlur={handleBlur}
        checked={props.value}
        disabled={props.disabled}
      />
      <label className="form-check-label">{props.label}</label>
    </div>
  );
};

export const FormikCustomCheckbox = (props) => {
  const handleChange = (event) => {
    props.onChange(props.name, !props.value);
  };
  const handleBlur = () => {
    props.onBlur(props.name, true);
  };
  return (
    <CustomInput
      type="checkbox"
      id={props.name}
      name={props.name}
      label={props.label}
      onChange={handleChange}
      onBlur={handleBlur}
      checked={props.value}
      disabled={props.disabled}
      inline
    />
  );
};

export class FormikRadioButtonGroup extends React.Component {
  handleChange = (val) => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <React.Fragment>
        {options.map((child, index) => {
          return (
            <div
              key={`${name}_${child.value}_${index}`}
              className={`position-relative form-check ${
                inline ? "form-check-inline" : ""
              }`}
            >
              <input
                id={child.value}
                name={name}
                type="radio"
                className="form-check-input"
                onChange={() => this.handleChange(child.value)}
                onBlur={this.handleBlur}
                defaultChecked={value === child.value}
                disabled={child.disabled}
              />
              <label className="form-check-label">{child.label}</label>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export class FormikCustomRadioGroup extends React.Component {
  handleChange = (val) => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <React.Fragment>
        {options.map((child, index) => {
          return (
            <CustomInput
              key={`${name}_${child.value}_${index}`}
              type="radio"
              id={`${name}_${child.value}_${index}`}
              name={child.name}
              label={child.label}
              onChange={() => this.handleChange(child.value)}
              onBlur={this.handleBlur}
              checked={value === child.value}
              disabled={child.disabled}
              inline={inline}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export class FormikTagsInput extends React.Component {
  handleChange = (val) => {
    this.props.onBlur(this.props.name, true);
    this.props.onChange(this.props.name, val);
  };

  render() {
    const { name, value } = this.props;
    return (
      <TagsInput
        id={name}
        name={name}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

export class FormikSwitch extends React.Component {
  handleChange = (val) => {
    this.props.onBlur(this.props.name, true);
    this.props.onChange(this.props.name, val);
  };

  render() {
    const { name, value, className } = this.props;
    return (
      <Switch
        id={name}
        name={name}
        className={className}
        checked={value}
        onChange={this.handleChange}
      />
    );
  }
}

export class FormikDatePicker extends React.Component {
  handleChange = (val) => {
    this.props.onChange(this.props.name, val);
  };
  handleBlur = (val) => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, className } = this.props;
    return (
      <DatePicker
        id={name}
        name={name}
        className={className}
        selected={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}
export class DateRangeFormikDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateRange: [new Date(), new Date()],
    };

    // this.state = {
    //   startDate: [],
    //   startDateTime: [],
    //   startDateRange: [],
    //   dateRange: ["", ""],
    //   endDateRange: [],
    // };
  }
  handleChange = (val) => {
    // console.log("date: ", val);
    this.setState({ dateRange: val });
  };
  //   this.props.onChange(this.props.name, this.state.dateRange);
  // };
  // handleBlur = (val) => {
  //   this.props.onBlur(this.props.name, true);
  // };

  // handleChangeStart = (update) => {
  // console.log("date: ", update);

  // let short = {{update  | date:'short'}}
  // console.log(short)
  // this.setState({ dateRange: update });

  // let newState = { dateRange: update };
  // console.log("newState: ", newState);

  // this.setState(newState, () => {
  //   console.log("date: ", this.state.dateRange);
  // });
  // };

  render() {
    // console.log(this.props);
    var [startDate, endDate] = this.state.dateRange;
    // console.log("startDate: ", startDate, " endDate: ", endDate);

    const { name, value, className } = this.props;
    // console.log(className + "    ClassNameProps")
    return (
      <DatePicker
        // dateFormat = {this.state.dateRange.toString()}
        dateFormat="dd/MM/yyyy"
        // dateFormat ="Pp"
        // value={this.state.dateRange.toString()}
        // selected={this.state.startDate}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        isClearable={true}
        onChange={(value) => this.handleChange(value)}
        // placeholderText="MM/dd/yyyy - MM/dd/yyyy"
      />
    );
  }
}



export class FormikDropZone extends React.Component {
  ReactDOMServer = require("react-dom/server");
  constructor(props) {
    super(props);

    this.state = {
      djsConfig: {
        acceptedFiles: "image/jpeg,image/png,image/gif",
        addRemoveLinks: true,
        uploadMultiple: true,
        // maxFilesize: 11,
        // params: {
        //   id: this.props.id,
        //   name: this.props.name,
        // }
      },
      eventHandlers: { addedfile: (file) => console.log(file) },
      componentConfig: { postUrl: "no-url" },
    };
  }
  // handleChange = (val) => {
  //   console.log("date: ", val);
  //   this.setState({ dateRange: val });
  // };
  render() {
    console.log(this.props, "<<=Classname");

    let eventHandlers = {
      addedfile: (file) => console.log("FileofDropzone", file),
    };
    let dropzoneComponentConfig = {
      postUrl: "https://httpbin.org/post",
    };
    let dropzoneConfig = {
      thumbnailHeight: 160,
      maxFilesize: 10,
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

    const { name, value, className } = this.props;
    return (
      <DropzoneComponent
        // className={className}
        // djsConfig={this.state.djsConfig}
        // config={this.state.componentConfig}
        eventHandlers={eventHandlers}
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        // className={'p-10 m-100'}
      />
    );
  }
}
