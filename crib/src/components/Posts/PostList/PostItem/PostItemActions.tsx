import React, { useContext } from 'react';
import { share, trash, close, bookmark } from 'ionicons/icons';
import { IonActionSheet } from '@ionic/react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../../../graphql/mutations';
import AuthContext from '../../../../context/auth-context';

type PostItemActionsProps = {
    postId: string,
    userId: string,
    showActionSheet: boolean,
    setShowActionSheet: React.Dispatch<React.SetStateAction<boolean>>
};

const PostItemActions = ({ postId, userId, showActionSheet, setShowActionSheet }: PostItemActionsProps) => {
    const [deletePost] = useMutation(DELETE_POST);
    const context = useContext(AuthContext);
    const currentUser = localStorage.getItem('userId') ?? "";
    const deleteButton = {
        text: 'Delete',
        role: 'destructive',
        icon: trash,
        handler: () => {
            deletePost({
                variables: {
                    postId: postId
                },
                context: {
                    headers: {
                        Authorization: 'Bearer ' + context.token
                    }
                }
            });
        }
    };

    const shareButton = {
        text: 'Share',
        icon: share,
        handler: () => {
            console.log('Share clicked');
        }
    };

    const saveButton = {
        text: 'Save',
        icon: bookmark,
        handler: () => {
            console.log('Save clicked');
        }
    }

    const cancelButton = {
        text: 'Cancel',
        icon: close,
        role: 'cancel',
        handler: () => {
            setShowActionSheet(false);
        }
    }

    const ionActionButtons = [
        cancelButton
    ];

    currentUser == userId && ionActionButtons.push(deleteButton);
    return (
        <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            buttons={ionActionButtons}
        >
        </IonActionSheet>
    )
}

export default PostItemActions;