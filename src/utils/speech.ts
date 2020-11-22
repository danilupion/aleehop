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
  utterance.rate = 0.8;
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
    recognition.addEventListener('result', (a: SpeechRecognitionEvent) => {
      result = a.results[0][0].transcript;
    });

    recognition.addEventListener('error', (a: ErrorEvent) => {
      rej(a);
    });

    recognition.addEventListener('end', () => {
      acc(result);
    });

    recognition.start();
  });
};
