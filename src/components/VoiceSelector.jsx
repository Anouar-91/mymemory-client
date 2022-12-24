import React, { useCallback, useEffect, useState } from 'react';


const synth = window.speechSynthesis;

const VoiceSelector = ({ selected = 0, setSelected }) => {
  const [voices, setVoices] = useState([]);

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices();
    setVoices(newVoices);
  }, []);

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList]);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(parseInt(e.target.value))}
    >
      {voices.map((voice, index) => (
        <option key={index} value={index}>
          {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
        </option>
      ))}
    </select>
  );
};

export default VoiceSelector;
