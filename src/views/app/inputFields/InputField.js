import React from "react";
import { Input } from "reactstrap";
export default function InputField(props) {
const  {
  value,
  placeholder,
  placeholderTextColor,
  onChange,
  style,
  errors,
  label,
  onFocus,
  touched,
  name,
  multiline,
  numberOflines,
  autoComplete,
  autoCorrect,
  autoCapitalize,
  spellCheck,
  maxLength,
  required,
  disabled,
  type,
  onClick,
  readOnly,
  formNoValidate,
  onBlur,
  containerClassName,
  onKeyPress,
} = props;
  return (
    <div
      // style={{ marginTop: 10 }}
      className={`form-group ${containerClassName ?? ""}`}
    >
      {
        label ? <label htmlFor={label} 
        // style={{ fontWeight: "bold" }}
        >
          <strong>{label}</strong>
        </label> : ""
      }
      
      
      <Input
        id="algolia-doc-search"
        type={type}
        placeholder={placeholder}
        // placeholderTextColor={placeholderTextColor}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        spellCheck={spellCheck}
        name={name}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onClick={onClick}
        required={required}
        disabled={disabled}
        onFocus={onFocus}
        multiline={multiline}
        onKeyPress={onKeyPress}
        // numberOflines={numberOflines}
        style={style}
        // error={error}
        readOnly={readOnly}
        formNoValidate={formNoValidate}
        onBlur={onBlur}
        
      />
      {errors ? <p style={{ color: "red" }}>{errors}</p> : null}
      {errors?.[name] && touched?.[name] && (
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      )}
    </div>
  );
};

