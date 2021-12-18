import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
const AuthContext = React.createContext({
  currentUser: undefined,
  loading: true,
  signUp: (email, password) => {},
  signIn: (email, password) => {},
  signOut: () => {},
  resetPassword: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);

      setLoading(false);
    });

    return () => unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
