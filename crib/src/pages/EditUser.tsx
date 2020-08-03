import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonButton, IonInput } from '@ionic/react';



const EditUser: React.FC = () => {
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [number] = useState<number>();
    const submitHandler = () => {
        if (firstName && lastName && email){
        }
        console.log(firstName, lastName, email);

    }
    const disableSubmit = () => {
        if (firstName && lastName && email){
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
                                    <IonCardTitle>Edit Account</IonCardTitle>
                                </IonCardHeader>
                                <form onSubmit={() => submitHandler()}>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position="floating">First Name</IonLabel>
                                        <IonInput 
                                        value={firstName} 
                                        placeholder="Andre"
                                        onIonChange={e => setFirstName(e.detail.value!)}
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Last Name</IonLabel>
                                        <IonInput 
                                            value={lastName} 
                                            placeholder="Zekic"
                                            onIonChange={e => setLastName(e.detail.value!)}

                                        />
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput 
                                            value={email} 
                                            type="email" 
                                            placeholder="andrezekic@me.com"
                                            onIonChange={e => setEmail(e.detail.value!)}
                                        />
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonButton disabled={disableSubmit()} type="submit">
                                            <IonLabel>Save</IonLabel>
                                        </IonButton>
                                    </IonItem>
                                </IonList>
                                </form>
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Change Unit Number</IonCardTitle>
                                </IonCardHeader>
                                <IonList>
                                    <IonItem lines="none">
                                        <IonLabel position="floating">Unit Number</IonLabel>
                                        <IonInput type="number" value={number} placeholder="123"></IonInput>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonButton disabled>
                                            <IonLabel>Save</IonLabel>
                                        </IonButton>
                                    </IonItem>
                                </IonList>
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Change Building</IonCardTitle>
                                </IonCardHeader>
                                <IonItem lines="none">
                                    <IonLabel>
                                        <h3>Current Building</h3>
                                        <h2>15 Jacksway Cres</h2>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonButton
                                        expand="block"
                                        routerLink="/account/edit/building"
                                    >
                                        <IonLabel>Edit</IonLabel>
                                    </IonButton>
                                </IonItem>


                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default EditUser;