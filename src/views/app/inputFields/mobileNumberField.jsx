import React from "react";
import MaskedInput from "react-text-mask";
import { mobileNumberMask } from "../helpers/contants";

export default function MobileNumberField(props) {
  const {
    label,
    name,
    handleChange,
    value,
    errors,
    touched,
    disabled,
    containerClassName,
    required,
    maxLength,
    onKeyPress,
    type,
    defaultValue,
    style
  } = props;
  return (
    <div className={`form-group ${containerClassName ?? ""}`}>
      {label && (
        <label htmlFor={name} style={{ fontWeight: "bold" }}>
          <strong>{label}*</strong>
        </label>
      )}

      <input
        className="form-control"
        name={name}
        defaultValue={defaultValue}
        placeholder="03XX-XXXXXXX"
        type={type}
        maxLength={maxLength ? maxLength : 11}
        onChange={handleChange}
        mask={mobileNumberMask}
        value={value}
        style={style}
        onKeyPress={onKeyPress}
        disabled={disabled}
        required={required}
      />
      {/* <MaskedInput
        className="form-control"
        name={name}
        placeholder="03XX-XXXXXXX"
        type="text"
        maxLength={15}
        onChange={handleChange}
        value={value}
        mask={mobileNumberMask}
        
        disabled={disabled}
      /> */}
      {errors?.[name] && touched?.[name] && (
        // <div className="mt-2 ml-2 text-center" style={{ color: color }}>
        //   {errors[name]}
        // </div>
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      )}
    </div>
  );
}
