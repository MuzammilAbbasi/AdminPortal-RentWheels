import React from "react";

export default function CheckboxField(props) {
  const {
    label,
    name,
    handleChange,
    value,
    errors,
    touched,
    disabled,
    required,
  } = props;

  return (
    <div className="form-check mt-2">
      <input
        type="checkbox"
        className="form-check-input"
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      />
      <label className="form-check-label font-weight-bold" htmlFor={name}>
        {label}
      </label>
      {errors?.[name] && touched?.[name] && (
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      )}
    </div>
  );
}
