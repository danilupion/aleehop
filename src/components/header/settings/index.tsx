import { useCallback, useEffect, useState } from 'react';

import useSettings, { TextCase } from '../../../hooks/useSettings';

import styles from './index.module.scss';
import Select from './select';

interface SettingsProps {
  onSave: () => void;
}

const Settings = ({ onSave }: SettingsProps) => {
  const { textCase, setTextCase } = useSettings();
  const [newTestCase, setNewTestCase] = useState(textCase);

  const handleCaseChange = useCallback(
    (value: TextCase) => {
      setNewTestCase(value);
    },
    [setNewTestCase],
  );

  const handleSave = useCallback(() => {
    setTextCase(newTestCase);
    onSave();
  }, [newTestCase, onSave, setTextCase]);

  useEffect(() => {
    setNewTestCase(textCase);
  }, [textCase]);

  return (
    <div className={styles.container}>
      <Select
        label="Mayúsculas/minúsculas"
        value={newTestCase}
        options={[
          ['Mayúsculas', TextCase.Uppercase],
          ['Minúsculas', TextCase.Lowercase],
        ]}
        onChange={handleCaseChange}
      />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default Settings;
