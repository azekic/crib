import { IonItem, IonAvatar, IonCard, IonCardContent } from "@ionic/react";
import {User} from '../../models';
import React from "react";

type CommentItemProps = {
    user: User,
    text: String
}

const CommentItem = ({user, text}: CommentItemProps) => {
    return (
        <IonItem lines="none">
            <IonAvatar slot="start">
            <img src={user.profilePicture} alt="Profile" />
            </IonAvatar>
            <IonCard>
            <IonCardContent>
                {text}
            </IonCardContent>
            </IonCard>
        </IonItem>
    )
}

export default CommentItem;