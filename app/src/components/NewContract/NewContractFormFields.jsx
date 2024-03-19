import React from "react";

export function Input({fieldName, label, register, errors, isAddress = false }) {
  const validationSchema = {
    required: "This field is required",
    pattern: {
      value: isAddress
        ? /^0x[A-Fa-f0-9]{40}$/
        : /^(:?[1-9][0-9]*|0\.0*[1-9]+)$/,
      message: isAddress
        ? "This is not an Ethereum address"
        : "This should be the transaction amount"
    }
  }

  return <div>
    <label htmlFor={fieldName}>{label}</label>
    <input className={errors && errors[fieldName] && "errorField"}
      {...register(fieldName, validationSchema)}
      type="text"
    />
    {errors && errors[fieldName]
      && <div className="error">{errors[fieldName]?.message}</div>}
  </div>
}

export const DenominationSelect = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="0">Wei</option>
      <option value="3">Kwei</option>
      <option value="6">Mwei</option>
      <option value="9">Gwei</option>
      <option value="12">Szabo</option>
      <option value="15">Finney</option>
      <option value="18">Ether</option>
      <option value="21">KEther</option>
      <option value="24">MEther</option>
      <option value="27">GEther</option>
      <option value="30">TEther</option>
    </select>
  </>
));