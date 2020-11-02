import { IonItem, IonTextarea, IonButton, IonIcon, IonAvatar } from '@ionic/react';
import { send } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import AuthContext, {ContextProps} from '../../context/auth-context';
import {gql, useMutation} from '@apollo/client';
import {ADD_COMMENT} from '../../graphql/mutations';

type CommentCreatorProps = {
    postId: string
}

function handleAddComment(
    context: ContextProps,
    text: string, 
    addComment: any,
    postId: string
    ){
    if (text.trim().length === 0){
        return;    
    }
    addComment({
        variables: {
            text: text,
            postId: postId
        },
        context: {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        }
    })
}
const CommentCreator = ( {postId}: CommentCreatorProps) => {
    const [commentText, setCommentText] = useState<string>();
    const [addComment] = useMutation(ADD_COMMENT);
    const context = useContext(AuthContext);
    return (
        <React.Fragment>
            <IonItem lines="none">
            <IonAvatar slot="start">
              <img src={""} alt="Profile" />
            </IonAvatar>
            <IonTextarea
                autofocus
                required
                onIonChange={e => setCommentText(e.detail.value!)}
                >
            </IonTextarea>
            <IonButton
              fill="clear"
              onClick={() => handleAddComment(context, commentText ?? "", addComment, postId)}
              className="ion-margin-top"
            >
              <IonIcon slot="icon-only" icon={send} />

            </IonButton>
          </IonItem>
        </React.Fragment>
    )
}

export default CommentCreator;