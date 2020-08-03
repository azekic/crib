import React, { useState } from 'react';
import { IonContent, IonPage, IonCard, IonGrid, IonRow, IonCol, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonCardHeader } from '@ionic/react';


const Register: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

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
        <IonPage>
            <IonContent>
                <IonGrid fixed className="ion-no-padding">
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        Register
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
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
                                        routerLink="/login"
                                        fill="clear"
                                        size="small"
                                        color="medium"
                                    >
                                        Back to login
                                    </IonButton>
                                    
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;
