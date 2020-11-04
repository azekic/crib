import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useContext } from 'react';

const Notifications: React.FC = () => {
    const noUnit = localStorage.getItem("unit") == null;

    return (
        <IonPage>
            <IonContent>
                <IonGrid fixed className="ion-no-padding">
                    <IonRow>
                        <IonCol>
                            {noUnit ?
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Alerts</IonCardTitle>
                                    </IonCardHeader>
                                    <IonList>
                                        <IonItem lines="none" routerLink="/account/edit">
                                            <IonLabel>Unit number not assigned</IonLabel>
                                            <IonButton>
                                                <IonLabel>Add Unit</IonLabel>

                                            </IonButton>
                                        </IonItem>
                                    </IonList>
                                </IonCard>
                                :
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>No new notifications</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Notifications;