import React from "react";

import styles from "./Button.module.css";

interface ButtonProps{
    type?: "button" | "submit";
    onClick?: () => void;
    blue?: boolean;
    gray?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type="button", onClick, blue, gray, children }) => {
    return <button type={type} onClick={onClick} className={`${styles.button} ${blue && styles.blueButton} ${gray && styles.grayButton}`}>
        {children}
    </button>
}

export default Button;