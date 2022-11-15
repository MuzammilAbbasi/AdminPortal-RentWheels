import React from "react";
import NumberFormat from "react-number-format";

export default function AmountField(props) {
  const {
    label,
    placeholder,
    handleChange,
    value,
    errors,
    touched,
    disabled,
    maxLength = 9,
    containerClassName,
    required,
    name,
  } = props;

  return (
    <div className={`form-group ${containerClassName ?? ""}`}>
      <label htmlFor="amount" style={{ fontWeight: "bold" }}>
        <strong>{label} *</strong>
      </label>
      <NumberFormat
        name={name}
        thousandSeparator={true}
        thousandsGroupStyle="thousand"
        prefix={"PKR "}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className="form-control"
        onValueChange={(values) => {
          handleChange({
            target: { name: name, value: values["value"] },
          });
        }}
        maxLength={maxLength ? maxLength : 16}
        required={required}
      />

      {errors ? (
        <div className="text-danger mt-2 ml-2 text-center">{errors[name]}</div>
      ) : null}
    </div>
  );
}
