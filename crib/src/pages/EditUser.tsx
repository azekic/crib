import React, { useContext, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonButton, IonInput, IonIcon, IonAvatar, IonButtons, IonHeader, IonModal, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';
import AuthContext from '../context/auth-context';
import { useMutation } from '@apollo/client';
import { close } from 'ionicons/icons';
import {UPDATE_PROFILE_PICTURE} from '../graphql/mutations';

const userData = {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    unit: localStorage.getItem("unit") != null ? "Unit " + localStorage.getItem("unit") : "No Unit",
    building: localStorage.getItem("building") ?? "No Building"
};

type ContextProps = {
    token: string | null,
    userId: string | null,
    login: (token: string, userId: string) => void,
    logout: () => void
};

function handleUpdateProfilePicture(
    context: ContextProps,
    photos: Photo[],
    updateProfilePicture: any) {
    if (photos.length !== 0) {
        const formData = new FormData();
        photos.forEach((photo) => {
            formData.append("file", photo.blob);
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY ?? "");
            formData.append("api_secret", process.env.REACT_APP_CLOUDINARY_API_SECRET ?? "");
            formData.append("upload_preset", "crib_upload");
        }
        );
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`, {
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
                localStorage.setItem("profilePicture", resData.url)
            });
    }
}
const EditUser: React.FC = () => {
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [showPictureModal, setShowPictureModal] = useState(false);
    const { photos, takePhoto } = usePhotoGallery();
    const [number] = useState<number>();
    const context = useContext(AuthContext);
    const [editUser] = useMutation(UPDATE_PROFILE_PICTURE);
    const submitHandler = () => {
        if (firstName && lastName && email) {
        }

    }
    const disableSubmit = () => {
        if (firstName && lastName && email) {
            return false;
        }
        return true;
    }
    const cameraHandler = () => {
        takePhoto()
        setShowPictureModal(true);
    }

    return (
        <IonPage>
            <IonModal
                isOpen={showPictureModal}
                onDidDismiss={() => setShowPictureModal(false)}
            >
                <IonHeader translucent>
                    <IonToolbar>
                        <IonButtons slot="primary">
                            <IonButton onClick={() => setShowPictureModal(false)}>
                                <IonIcon slot="icon-only" icon={close} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Edit Profile Picture</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    {photos.map((photo, index) => (
                        <IonImg src={photo.webviewPath} key={index} />
                    ))}
            <IonButton
                class="ion-margin"
                expand="block"
                onClick={() => {
                    handleUpdateProfilePicture(context, photos, editUser);
                    setShowPictureModal(false);
                }}
              >
                Save
                </IonButton>
                </IonContent>
            </IonModal>
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
                                        <IonItem lines="none">
                                            <IonAvatar class="pointer-cursor" onClick={cameraHandler}>
                                                <img src={localStorage.getItem("profilePicture") ?? ""} alt="Profile" />
                                            </IonAvatar>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel position="floating">First Name</IonLabel>
                                            <IonInput
                                                value={firstName}
                                                placeholder={userData.firstName ?? "No First Name"}
                                                onIonChange={e => setFirstName(e.detail.value!)}
                                            />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel position="floating">Last Name</IonLabel>
                                            <IonInput
                                                value={lastName}
                                                placeholder={userData.lastName ?? "No Last Name"}
                                                onIonChange={e => setLastName(e.detail.value!)}

                                            />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel position="floating">Email</IonLabel>
                                            <IonInput
                                                value={email}
                                                type="email"
                                                placeholder={userData.email ?? "No Email"}
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
                                    <IonCardTitle>Edit Location</IonCardTitle>
                                </IonCardHeader>
                                <IonList>
                                    <IonItem lines="none">
                                        <IonLabel>
                                        <h3>Unit</h3>
                                        <h2>{userData.unit}</h2>
                                            </IonLabel>
                                        <IonButton
                                            routerLink="/account/edit/unit"
                                        >
                                        <IonLabel>Change Unit</IonLabel>
                                    </IonButton>
                                    </IonItem>
                                    <IonItem lines="none">
                                    <IonLabel>
                                        <h3>Current Building</h3>
                                        <h2>{userData.building}</h2>
                                    </IonLabel>
                                    <IonButton
                                        routerLink="/account/edit/building"
                                    >
                                        <IonLabel>Change Building</IonLabel>
                                    </IonButton>
                                </IonItem>
                                </IonList>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default EditUser;