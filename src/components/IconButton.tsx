import classnames from 'classnames';
import React from 'react';

import styles from './IconButton.module.scss';

interface IconButtonProps {
  className?: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton = ({ className, icon, onClick, disabled }: IconButtonProps): JSX.Element => {
  return (
    <button
      className={classnames(className, styles.iconButton)}
      onClick={onClick}
      disabled={disabled}
    >
      <i className={icon}></i>
    </button>
  );
};

export default IconButton;
