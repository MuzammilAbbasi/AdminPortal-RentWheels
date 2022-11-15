import React from "react";

export default function AccountField(props) {
  const {
    placeholder,
    handleChange,
    value,
    errors,
    touched,
    disabled,
    containerClassName,
    maxLength,
    isConsumerNumber,
    label,
    name,
    required,
  } = props;
  return (
    <div className={`form-group ${containerClassName ?? ""}`}>
      <label htmlFor={label} style={{ fontWeight: "bold" }}>
        <strong>{label} *</strong>
      </label>
      <input
        className="form-control"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        maxLength={maxLength ? maxLength : 14}
        required={required}
        // pattern=".{8,}"
        pattern={`.{${maxLength ? maxLength : 14},}`}
      />
      {errors?.[name] && touched?.[name] && (
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      )}
    </div>
  );
}
