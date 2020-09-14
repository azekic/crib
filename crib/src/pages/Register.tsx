import React, { useState } from 'react';
import { IonCard, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonCardHeader, IonPage, IonContent, IonGrid, IonRow, IonCol, isPlatform } from '@ionic/react';

type RegisterProps = {
    setTitle: React.Dispatch<React.SetStateAction<string>>
}
const Register = ({setTitle}: RegisterProps) => {    
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const contentStyle = isPlatform("desktop") ? "desktop-content" : "mobile-content"; 

    const submitHandler = () => {
        if (email && password && confirmPassword) {
        }

    }
    const disableSubmit = () => {
        if (email && password && confirmPassword) {
            return false;
        }
        return true;
    }
    return (
        <div className="ion-padding">
                <form onSubmit={() => submitHandler()}>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput
                                value={email}
                                onIonChange={e => setEmail(e.detail.value!)}
                                type="email"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                value={password}
                                onIonChange={e => setPassword(e.detail.value!)}
                                type="password"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Confirm Password</IonLabel>
                            <IonInput
                                value={confirmPassword}
                                onIonChange={e => setConfirmPassword(e.detail.value!)}
                                type="password"
                            />
                        </IonItem>
                        <IonButton
                            disabled={disableSubmit()}
                            type="submit"
                            expand="block"
                            className="ion-margin-top"
                        >
                            <IonLabel>Submit</IonLabel>
                        </IonButton>
                    </IonList>
                </form>
                <IonButton
                    onClick={() => setTitle('Login')}
                    fill="clear"
                    size="small"
                    color="medium"
                >
                    Go to Login
                </IonButton>

            </div>
    );
};

export default Register;
