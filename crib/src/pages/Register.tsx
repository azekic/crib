import React from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/react';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { LOGIN_USER } from '../graphql/queries';

type RegisterProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}
const Register = ({ setTitle }: RegisterProps) => {
  const { handleSubmit, control, errors, getValues } = useForm();
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
    setTitle('Login');

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
                required: "Enter your first name",
              }}
              type="text"
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              as={<IonText color="danger" />}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Last Name</IonLabel>
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonInput onIonChange={onChange} />
              )}
              control={control}
              name="lastName"
              rules={{
                required: "Enter your last name",
              }}
              type="text"
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              as={<IonText color="danger" />}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonInput onIonChange={onChange} />
              )}
              control={control}
              name="email"
              rules={{
                required: "Enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              }}
              type="email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as={<IonText color="danger" />}
            />
          </IonItem>
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
                required: "Enter your password",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters"
                }
              }}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              as={<IonText color="danger" />}
            />
          </IonItem>
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
                required: "Confirm your password",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters"
                },
                validate: (value) => {
                  return value === getValues()["password"] ? true : "The passwords do not match"
                }
              }}
            />
            <ErrorMessage
              errors={errors}
              name="confirm-password"
              as={<IonText color="danger" />}
            />
          </IonItem>
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
