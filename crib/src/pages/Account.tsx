import React from 'react';
import { IonContent, IonPage, IonCard, IonList, IonItem, IonLabel, IonCardHeader, IonCardTitle, IonIcon, IonButton, IonToggle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { moon } from 'ionicons/icons';
import './Account.css';

const toggleDarkModeHandler = () => {
  document.body.classList.toggle("dark");
};

const Account: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid fixed className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Account Information</IonCardTitle>
                </IonCardHeader>
                <IonList>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Name</h3>
                      <h2><b>Andre Zekic</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Email</h3>
                      <h2><b>andrezekic@me.com</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Unit Number</h3>
                      <h2><b>Unit 123</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Building</h3>
                      <h2><b>15 Jacksway Cres</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonButton
                      routerLink="/account/edit"
                    >
                      <IonLabel>Edit</IonLabel>

                    </IonButton>
                  </IonItem>
                </IonList>

              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>App Settings</IonCardTitle>
                </IonCardHeader>
                <IonList>
                  <IonItem lines="none">
                    <IonIcon slot="start" icon={moon}>
                    </IonIcon>
                    <IonLabel>Toggle Dark Mode</IonLabel>
                    <IonToggle slot="end" onIonChange={toggleDarkModeHandler} />
                  </IonItem>
                </IonList>
              </IonCard>
                <IonButton 
                  routerLink="/login"
                  className="margin-horizontal" 
                  expand="block">
                  Log out
                </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;
