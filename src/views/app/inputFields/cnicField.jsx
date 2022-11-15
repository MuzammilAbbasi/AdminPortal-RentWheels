import React from "react";
import MaskedInput from "react-text-mask";
import { cnicMask, cnicYupValidation } from "../helpers/contants";

export default function CNICField(props) {
  const {
    label,
    name,
    handleChange,
    value,
    errors,
    touched,
    style,
    disabled,
    defaultValue,
    containerClassName,
    required,
    maxLength,
    autoComplete,
    labelfont,
    onKeyPress
  } = props;

  const mystyle= labelfont ? "" : "bold";
  
  return (
    <div className={`form-group ${containerClassName ?? ""}`}>
      {/* {label && <label htmlFor={name}>{label}</label>} */}
      {/* htmlFor={name} */}
      {label ? <label  
      style={{fontWeight:mystyle}}
      >
        <strong>{label}</strong>
      </label> : ""}
      <MaskedInput
        className="form-control"
        defaultValue={defaultValue}
        name={name}
        placeholder={"XXXXX-XXXXXXX-X"}
        type="text"
        style={style}
        onKeyPress={onKeyPress}
        // maxLength={20}
        onChange={handleChange}
        value={value}
        mask={cnicMask}
        disabled={disabled}
        // guide={false}
        autoComplete={autoComplete}
        required={required}
        pattern={`.{${maxLength ? maxLength : 13},}`}
        // minLength={13}
      />
      {errors?.[name] && touched?.[name] && (
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      )}
    </div>
  );
}
