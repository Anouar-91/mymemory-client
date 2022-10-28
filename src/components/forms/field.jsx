import React from 'react'


function field({name, label, value, onChange, placeholder, type="text", error = "", required = false, className=null}) {
  return (
    <div className="form-group">
    <label className="label" htmlFor={name}>{label}</label>
    <input  required={required ? true : false } onChange={onChange} value={value} type={type} placeholder={placeholder}
        className={(!error 
          ? "form-control " +
          className 
          :"form-control is-invalid" +
          className ) 
          } id={name} name={name} />
    {error && <p className="invalid-feedback">{error}</p>}
</div>
  )
}

export default field