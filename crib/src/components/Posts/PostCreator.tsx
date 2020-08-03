import React, { useState } from 'react';
import { IonItem, IonTextarea, IonButton, IonIcon, IonImg } from '@ionic/react';
import { camera, videocam, documentAttach, send } from 'ionicons/icons';
import { usePhotoGallery, Photo } from '../../hooks/usePhotoGallery';
import UserAvatar from '../UserAvatar';
import './PostCreator.css';

type PostProps = {
    name: string
    unit: string
    profilePicture: string
    onSubmitAction: React.Dispatch<React.SetStateAction<boolean>>
    newPhotos: Photo[]
}
const PostCreator = ({ name, unit, profilePicture, onSubmitAction, newPhotos }: PostProps) => {
    const [text, setText] = useState<string>();
    const { photos, takePhoto } = usePhotoGallery();
    const mergedPhotos = photos.concat(newPhotos);
    return (
        <React.Fragment>
            <IonItem lines="none">
                <UserAvatar
                    name={name}
                    unit={unit}
                    profilePicture={profilePicture}
                />
            </IonItem>
            <IonItem>
                <IonTextarea
                    className="post-text-box"
                    required
                    minlength={0}
                    maxlength={2500}
                    rows={6}
                    value={text}
                    placeholder="What do you want to write about?"
                    onIonChange={e => setText(e.detail.value!)}
                >
                </IonTextarea>
            </IonItem>
            <IonButton
                className="ion-float-left"
                fill="clear"
                color="medium"
                onClick={takePhoto}
            >
                <IonIcon slot="icon-only" icon={camera} />
            </IonButton>
            <IonButton
                className="ion-float-left"
                fill="clear"
                color="medium"
                onClick={() => console.log("videocam clicked")}
            >
                <IonIcon slot="icon-only" icon={videocam} />
            </IonButton>
            <IonButton
                className="ion-float-left" fill="clear"
                color="medium"
                onClick={() => console.log("documentAttach clicked")}
            >
                <IonIcon slot="icon-only" icon={documentAttach} />
            </IonButton>
            <IonButton
                className="ion-float-right"
                fill="clear"
                onClick={() => onSubmitAction(false)}
            >
                <IonIcon slot="icon-only" icon={send} />
            </IonButton>

                    {mergedPhotos.map((photo, index) => (
                            <IonImg src={photo.webviewPath} key={index}/>
                    ))}
        </React.Fragment>
    );
};

export default PostCreator;