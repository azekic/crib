import React, { useContext } from 'react';
import { IonContent, IonPage, IonCard, IonList, IonItem, IonLabel, IonCardHeader, IonCardTitle, IonIcon, IonButton, IonToggle, IonGrid, IonRow, IonCol, isPlatform } from '@ionic/react';
import { moon } from 'ionicons/icons';
import './Account.css';
import AuthContext from '../context/auth-context';

const toggleDarkModeHandler = () => {
  document.body.classList.toggle("dark");
};
const contentStyle = isPlatform("desktop") ? undefined : "mobile-content";
const Account: React.FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <IonPage>
      <IonContent className={contentStyle}>
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
                      <h2><b>{localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")}</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Email</h3>
                      <h2><b>{localStorage.getItem("email")}</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Unit Number</h3>
                      <h2><b>{localStorage.getItem("unit") != null ? "Unit " + localStorage.getItem("unit") : "No Unit"}</b></h2>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Building</h3>
                      <h2><b>{localStorage.getItem("building")}</b></h2>
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
                className="margin-horizontal"
                expand="block"
                onClick={() => {
                  localStorage.clear();
                  logout();
                }}
              >
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
