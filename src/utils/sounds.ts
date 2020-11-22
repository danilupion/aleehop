const successAudio = new Audio('/sounds/success.wav');
const errorAudio = new Audio('/sounds/error.wav');

export const success = (): Promise<void> => {
  return successAudio.play();
};

export const error = (): Promise<void> => {
  return errorAudio.play();
};
