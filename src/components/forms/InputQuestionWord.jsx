import React from 'react'


function InputQuestionWord({name, label, value, onChange, placeholder, type="text", error = "", required = false, mode ="en", className=null, description=null}) {
  return (
    <div className="form-group">
    <label  htmlFor={name}>How do you say <strong className='text-secondary'>{label}</strong> {mode === "fr" ? "in english" : "in french"}  ?</label>
    {description && (
      <>
      <br />
    <small>Description : {description}</small>
    </>
    )}
    <input required={required ? true : false } onChange={onChange} value={value} type={type} placeholder={placeholder}
         className={(!error 
          ? "form-control input-shadow-secondary " +
          className 
          :"form-control is-invalid input-shadow-secondary " +
          className ) 
          } id={name} name={name} />
    {error && <p className="invalid-feedback">{error}</p>}
</div>
  )
}

export default InputQuestionWord