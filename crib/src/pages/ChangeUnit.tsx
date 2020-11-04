import { useMutation } from '@apollo/client';
import AuthContext from '../context/auth-context';
import { ErrorMessage } from '@hookform/error-message';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText } from '@ionic/react';
import React, {useContext} from 'react';
import { useForm, Controller } from "react-hook-form";
import { ADD_UNIT } from '../graphql/mutations';

const ChangeUnit = () => {
    const { handleSubmit, control, errors } = useForm();
    const [addUnit, { data, error }] = useMutation(ADD_UNIT);
    const context = useContext(AuthContext);
    const buildingId = localStorage.getItem("buildingId");
    
    if (data) {
        localStorage.setItem("unit", data.addUnit.unitNumber);
    }
    const submitHandler = (input: { [x: string]: any; }) => {
        if (buildingId == null) {
            return;
        }
        addUnit({
          variables: {
            buildingId: buildingId,
            unitNumber: parseInt(input.unit)
          },
          context: {
            headers: {
              Authorization: 'Bearer ' + context.token
            }
          }
        });
      }
      if (error) {
        console.log(error);
      }

    return (
        <IonPage>
            <IonContent>
                <IonGrid fixed className="ion-no-padding">
                    <IonRow>
                        <IonCol>
                            <form onSubmit={handleSubmit(input => submitHandler(input))}>
                                <IonItem>
                                    <IonLabel position="floating">Unit</IonLabel>
                                    <Controller
                                        render={({ onChange}) => (
                                            <IonInput onIonChange={onChange} />
                                        )}
                                        control={control}
                                        name="unit"
                                        rules={{
                                            required: "Enter a unit",
                                        }}
                                        type="number"
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="unit"
                                        as={<IonText color="danger" />}
                                    />
                                </IonItem>
                                <IonButton
                                    type="submit"
                                    expand="block"
                                    className="ion-margin-top"
                                >
                                    <IonLabel>Save</IonLabel>
                                </IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};

export default ChangeUnit;