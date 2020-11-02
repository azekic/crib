import React, { useContext } from 'react';
import { share, trash, close, bookmark } from 'ionicons/icons';
import { IonActionSheet } from '@ionic/react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../../../graphql/mutations';
import AuthContext from '../../../../context/auth-context';

type PostItemActionsProps = {
    postId: string,
    showActionSheet: boolean,
    setShowActionSheet: React.Dispatch<React.SetStateAction<boolean>>
};

const PostItemActions = ({ postId, showActionSheet, setShowActionSheet }: PostItemActionsProps) => {
    const [deletePost] = useMutation(DELETE_POST);
    const context = useContext(AuthContext);
    return (
        <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            buttons={[{
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
            }, {
                text: 'Share',
                icon: share,
                handler: () => {
                    console.log('Share clicked');
                }
            }, {
                text: 'Save',
                icon: bookmark,
                handler: () => {
                    console.log('Save clicked');
                }
            }, {
                text: 'Cancel',
                icon: close,
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]}
        >
        </IonActionSheet>
    )
}

export default PostItemActions;