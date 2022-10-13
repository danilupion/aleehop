const synth = window.speechSynthesis;

export const say = (text: string): void => {
  const voices = synth.getVoices().filter((v) => v.lang.match(/es-/g));

  const utterance = new SpeechSynthesisUtterance(
    navigator && navigator.platform === 'Win32' ? text.toLowerCase() : `/${text.toLowerCase()}/`,
  );
  utterance.rate = 0.7;
  utterance.lang = 'es-ES';
  utterance.voice = voices[3];
  synth.speak(utterance);
};

export const recognize = (dict: string[], lang = 'es-ES'): Promise<string> => {
  const SpeechRecognition =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const SpeechGrammarList =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.addEventListener('result', (ev: any) => {
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
