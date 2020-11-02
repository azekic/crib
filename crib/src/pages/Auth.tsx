import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent } from '@ionic/react';
import { close } from 'ionicons/icons';
import Login from './Login';
import Register from './Register';

type AuthProps = {
  title: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>

}
const Auth = ({ title, setShowModal }: AuthProps) => {
  const [modalTitle, setTitle] = useState(title);

  return (
    <React.Fragment>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={() => setShowModal(false)}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>{modalTitle}</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {modalTitle === 'Login' ? <Login setTitle={setTitle} /> : <Register setTitle={setTitle} />}
      </IonContent>
    </React.Fragment>
  )
}

export default Auth;