import React from 'react'


function InputQuestionWord({name, label, value, onChange, placeholder, type="text", error = "", required = false}) {
  return (
    <div className="form-group">
    <label  htmlFor={name}>How do you say <strong className='text-primary'>{label}</strong> in french ?</label>
    <input required={required ? true : false } onChange={onChange} value={value} type={type} placeholder={placeholder}
        className={(!error ? "form-control" : "form-control is-invalid")} id={name} name={name} />
    {error && <p className="invalid-feedback">{error}</p>}
</div>
  )
}

export default InputQuestionWord