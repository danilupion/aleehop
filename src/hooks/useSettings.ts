import { createContext, useContext } from 'react';

export enum TextCase {
  Lowercase = 'lowercase',
  Uppercase = 'uppercase',
}

interface Settings {
  textCase: TextCase;
  setTextCase: (textCase: TextCase) => void;
}

export const SettingsContext = createContext<Settings>({
  textCase: TextCase.Lowercase,
  setTextCase: (newTextCase) => {
    console.log(newTextCase);
  },
});

const useSettings = () => useContext(SettingsContext);

export default useSettings;
