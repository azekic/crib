import React from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

type RegisterProps = {
    setTitle: React.Dispatch<React.SetStateAction<string>>
}
const Register = ({setTitle}: RegisterProps) => {    
    const { handleSubmit, control, errors } = useForm();
    const [createUser] = useMutation(CREATE_USER);

    const submitHandler = (data: { [x: string]: any; }) => {
        if (data.email?.trim().length === 0 || 
        data.password?.trim().length === 0 ||
        data.firstName?.trim().length === 0 ||
        data.lastName?.trim().length === 0
        ) {
            return;
        }
        createUser({
          variables: { 
              email: data.email, 
              password: data.password,
              firstName: data.firstName,
              lastName: data.lastName
            }
        });
    }
    return (
        <div className="ion-padding">
                            <form onSubmit={handleSubmit(data => submitHandler(data))}>
                    <IonList>
                    <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} />
                )}
                control={control}
                name="firstName"
                rules={{
                  required: "This is a required field",
                }}
                type="text"
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="lastName"
              as={<div style={{ color: "red" }} />}
            />
                    <IonItem>
              <IonLabel position="floating">Last Name</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} />
                )}
                control={control}
                name="lastName"
                rules={{
                  required: "This is a required field",
                }}
                type="text"
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="lastName"
              as={<div style={{ color: "red" }} />}
            />
                    <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} />
                )}
                control={control}
                name="email"
                rules={{
                  required: "This is a required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"
                  }
                }}
                type="email"
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="email"
              as={<div style={{ color: "red" }} />}
            />
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} type="password"
                  />
                )}
                control={control}
                name="password"
                rules={{
                  required: "This is a required field",
                  minLength: {
                    value: 5,
                    message: "min length is 5"
                  }
                }}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="password"
              as={<div style={{ color: "red" }} />}
            />
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} type="password"
                  />
                )}
                control={control}
                name="confirm-password"
                rules={{
                  required: "This is a required field",
                  minLength: {
                    value: 5,
                    message: "min length is 5"
                  }
                }}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="confirm-password"
              as={<div style={{ color: "red" }} />}
            />
                        
                        <IonButton
                            type="submit"
                            expand="block"
                            className="ion-margin-top"
                        >
                            <IonLabel>Register</IonLabel>
                        </IonButton>
                    </IonList>
                </form>
                                <IonButton
                    onClick={() => setTitle('Login')}
                    fill="clear"
                    size="small"
                    color="medium"
                >
                    Go to Login
                </IonButton>

            </div>
    );
};

export default Register;
