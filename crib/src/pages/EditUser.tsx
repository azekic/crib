import React, { useContext, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonButton, IonInput, IonIcon } from '@ionic/react';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';
import AuthContext from '../context/auth-context';
import { gql, useMutation } from '@apollo/client';
import { camera } from 'ionicons/icons';

const UPDATE_PROFILE_PICTURE = gql`
    mutation UpdateProfilePicture($profilePicture: String!){
        updateProfilePicture(updateProfilePictureInput: {profilePicture: $profilePicture}) {
            profilePicture
        }
    }
`;

type ContextProps = {
    token: string | null,
    userId: string | null,
    login: (token: string, userId: string) => void,
    logout: () => void
};

function handleUpdateProfilePicture(
    context: ContextProps,
    photos: Photo[],
    updateProfilePicture: any)
    {
        if (photos.length !== 0) {
            const formData = new FormData();
            photos.forEach((photo) => {
              formData.append("file", photo.blob);
              formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY ?? "");
              formData.append("api_secret", process.env.REACT_APP_CLOUDINARY_API_SECRET ?? "");
              formData.append("upload_preset", "crib_upload");
              }
            );
             fetch('https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/upload', {
                 method: "POST",
                 body: formData
             }).then(res => {
                  if (res.status !== 200 && res.status !== 201) {
                      throw new Error('Failed!');
                  }
                  return res.json();
              })
             .then((resData) => {
                 updateProfilePicture({
                    variables: { 
                        profilePicture: resData.url
                     },
                     context: {
                         headers: {
                             Authorization: 'Bearer ' + context.token
                         }
                     }
                 });
             });
    }
}
const EditUser: React.FC = () => {
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const { photos, takePhoto } = usePhotoGallery();
    const [number] = useState<number>();
    const context = useContext(AuthContext);
    const [editUser, {data}] = useMutation(UPDATE_PROFILE_PICTURE);
    const submitHandler = () => {
        if (firstName && lastName && email){
        }

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
                                    <IonLabel position="floating">Profile Picture</IonLabel>
                                    <IonButton
                                        className="ion-float-left"
                                        fill="clear"
                                        color="medium"
                                        onClick={takePhoto}
                                    >
                                        <IonIcon slot="icon-only" icon={camera} />
                                    </IonButton>
                                    <IonButton
                                        onClick={() => {
                                            handleUpdateProfilePicture(context, photos, editUser);
                                        }}
                                    >
                                        submit
                                    </IonButton>
                                    </IonItem>
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