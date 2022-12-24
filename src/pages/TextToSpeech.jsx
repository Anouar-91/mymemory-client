import React, { FormEvent, useState } from 'react';
import { render } from 'react-dom';
import VoiceSelector from '../components/VoiceSelector';

const synth = window.speechSynthesis;

const TextToSpeech = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(0);

  if (!synth)
    return <span>Aw... your browser does not support Speech Synthesis</span>;

  const speak = (e) => {
    e.preventDefault();

    const synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(textValue);
    console.log(selectedVoice)
    utterance.voice = synth.getVoices()[49];

    synth.speak(utterance);
  };

  return (
    <form onSubmit={speak}>
      <input
        type="text"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice} />
      <button type="submit">Speak</button>
    </form>
  );
};

export default TextToSpeech