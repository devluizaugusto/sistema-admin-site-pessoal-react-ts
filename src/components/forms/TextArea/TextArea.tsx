import React from 'react';

import styles from './TextArea.module.css';

import { Input, InputProps } from '../Input';

interface TextAreaProps extends InputProps{}

const TextArea: React.FC<TextAreaProps> = ({ label, name, as="textarea", errors, touched }) => {
    return (
        <Input 
            label={label}
            name={name}
            as={as}
            errors={errors}
            touched={touched}
            className={styles.textArea}
        />
    );
};

export default TextArea;