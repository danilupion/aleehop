const synth = window.speechSynthesis;

interface WindowWithSpecchRecognition extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechGrammarList: any;
}

export const say = (text: string): void => {
  const voices = synth.getVoices().filter((v) => v.lang.match(/es-/g));

  const utterance = new SpeechSynthesisUtterance(`/${text.toLowerCase()}/`);
  utterance.rate = 0.7;
  utterance.lang = 'es-ES';
  utterance.voice = voices[3];
  synth.speak(utterance);
};

export const recognize = (dict: string[], lang = 'es-ES'): Promise<string> => {
  const recognition = new ((window as unknown) as WindowWithSpecchRecognition).webkitSpeechRecognition();
  const speechRecognitionList = new ((window as unknown) as WindowWithSpecchRecognition).webkitSpeechGrammarList();
  speechRecognitionList.addFromString(
    `#JSGF V1.0; grammar words; public <word> = ${dict.join(' | ')} ;`,
    1,
  );
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return new Promise((acc, rej) => {
    let result = '';
    recognition.addEventListener('result', (ev: SpeechRecognitionEvent) => {
      console.log(ev.results[0][0].transcript);
      result = ev.results[0][0].transcript;
    });

    recognition.addEventListener('error', (ev: ErrorEvent) => {
      rej(ev);
    });

    recognition.addEventListener('end', () => {
      acc(result);
    });

    recognition.start();
  });
};
