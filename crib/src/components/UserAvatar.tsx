import React from 'react';
import { IonAvatar, IonLabel } from '@ionic/react';

type PostProps = {
    name: string,
    unit: string,
    profilePicture: string
}
const UserAvatar = ({ name, unit, profilePicture }: PostProps) => {
    return (
        <React.Fragment>
            <IonAvatar slot="start">
                <img src={profilePicture} alt="Profile"/>
            </IonAvatar>
            <IonLabel>
                <h2><b>{name}</b></h2>
                <h3>Unit {unit}</h3>
            </IonLabel>
        </React.Fragment>
    );
};

export default UserAvatar;