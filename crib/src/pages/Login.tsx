import React from 'react';
import { IonContent, IonPage, IonCard, IonGrid, IonRow, IonCol, IonCardTitle } from '@ionic/react';


const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid fixed className="ion-no-padding">
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardTitle>
                                    Login
                                </IonCardTitle>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
