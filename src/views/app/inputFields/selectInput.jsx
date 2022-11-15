import React from "react";
import { Input } from "reactstrap";

export default function SelectInput(props) {
  const {
    label,
    name,
    placeholder,
    handleChange,
    value,
    errors,
    touched,
    options,
    disabled,
    setSearchCriteria,
    containerClassName,
    className,
    required,
    style,
  } = props;
  return (
    <div className={`form-group ${containerClassName ?? ""}`}>
      {label && (
        <label htmlFor={name} style={{ fontWeight: "bold" }}>
          <strong>{label}</strong>
        </label>
      )}
      <Input
        className={className ? className : "form-control"}
        type={"select"}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        
        required={required}
        // size="2"
        style={style}
        value={value}
        onChange={handleChange}
      >
        <option value="" hidden>
          {placeholder}
        </option>
        
        {options.map((option, i) => (
          <option key={`opt_${i}`} value={option.value}>
            {option.value}
          </option>
        ))}
      </Input>
      {/* <select
        className={className ? className : "form-control"}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        required={required}
        // defaultValue={placeholder}
      >
        <option key={placeholder} value={placeholder}>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={`opt_${i}`} value={option}>
            {option.name}
          </option>
        ))}
      </select> */}
      {errors?.[name] && touched?.[name] && (
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      )}
    </div>
  );
}
