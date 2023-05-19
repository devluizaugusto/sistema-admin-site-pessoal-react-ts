import React from 'react';

import styles from './InformationsCard.module.css';

import { Informations } from '../../../../services/InformationsServices';

interface InformationsCardProps{
    informations: Informations;
}

const InformationsCard: React.FC<InformationsCardProps> = ({ informations }) => {
    const { photo, name, office, summary} = informations;

    return (
        <div className={styles.card}>
            <img src={photo} alt={`${name}'s photo`} className={styles.photo} />
            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.office}>{office}</p>
                <p className={styles.summary}>{summary}</p>
            </div>
        </div>
    );
};

export default InformationsCard;