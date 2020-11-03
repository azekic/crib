import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonText, IonChip, IonLabel } from '@ionic/react';
import { close, pin } from 'ionicons/icons';
import Login from './Login';
import Register from './Register';

type AuthProps = {
  title: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>

}
const Auth = ({ title, setShowModal }: AuthProps) => {
  const [modalTitle, setTitle] = useState(title);
  const [registerSuccess, setRegisterSuccess] = useState(false);
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
      {registerSuccess &&
        <div className='success-container' onClick={() => setRegisterSuccess(false)}>
        <IonChip color='success' class='ion-float-end'>
        <IonLabel>Registration Successful</IonLabel>
        <IonIcon icon={close} />
      </IonChip>
      </div>
      }
        {modalTitle === 'Login' ? <Login setTitle={setTitle}/> : <Register setTitle={setTitle} setRegisterSuccess={setRegisterSuccess}/>}
      </IonContent>
    </React.Fragment>
  )
}

export default Auth;