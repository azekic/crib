import { createContext } from 'react';

export type ContextProps = {
    token: string | null,
    userId: string | null,
    login: (token: string, userId: string) => void,
    logout: () => void
};

export default createContext<ContextProps>({
    token: null,
    userId: null,
    login: (token, userId) => {},
    logout: () => {}
});
