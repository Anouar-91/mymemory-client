import React from 'react'


function InputQuestionOralWord({ name, label, value, onChange, placeholder, type = "text", error = "", required = false, mode = "en", className = null }) {
  const speak = (word) => {
    const synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(word);
    utterance.voice = synth.getVoices()['en-US'];
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };
  return (
    <div className="form-group">
      <label htmlFor={name} className="mb-3">How do you say 
        <strong className='text-secondary'> &nbsp;
          <a onClick={() => speak(label)} className="btn btn-sm btn-primary">
            <i class="fa-sharp fa-solid fa-headphones"></i>
          </a> &nbsp;
        </strong> {mode === "fr" ? "in english" : "in french"}  ?
    </label>
      <input required={required ? true : false} onChange={onChange} value={value} type={type} placeholder={placeholder}
        className={(!error
          ? "form-control input-shadow-secondary " +
          className
          : "form-control is-invalid input-shadow-secondary " +
          className)
        } id={name} name={name} />
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  )
}

export default InputQuestionOralWord