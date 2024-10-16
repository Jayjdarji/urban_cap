import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for modal
const ModalContext = createContext();

// Custom hook to use the ModalContext
export const useModal = () => {
  return useContext(ModalContext);
};

// ModalProvider component to wrap your application
export const Context = ({ children }) => {
  // State for managing modal visibility
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isContactUs, setIsContactUs] = useState(false);
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);

  // Handlers for opening modals
  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const openResetPassword = () => setIsResetPasswordOpen(true);
  const openContactUs = () => setIsContactUs(true);
  const openEmailVerification = () => setIsEmailVerificationOpen(true);

  // Handlers for closing modals
  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);
  const closeResetPassword = () => setIsResetPasswordOpen(false);
  const closeContactUs = () => setIsContactUs(false);
  const closeEmailVerification = () => setIsEmailVerificationOpen(false);

  useEffect(() => {
    if (isLoginOpen) {
      closeRegister();
      closeResetPassword();
      closeContactUs();
      closeEmailVerification();
    }
  }, [isLoginOpen]);

  useEffect(() => {
    if (isRegisterOpen) {
      closeLogin();
      closeResetPassword();
      closeContactUs();
      closeEmailVerification()
    }
  }, [isRegisterOpen]);

  useEffect(() => {
    if (isResetPasswordOpen) {
      closeLogin();
      closeRegister();
      closeContactUs();
      closeEmailVerification();
    }
  }, [isResetPasswordOpen]);

  useEffect(() => {
    if (isContactUs) {
      closeLogin();
      closeRegister();
      closeResetPassword();
      closeEmailVerification();
    }
  }, [isContactUs]);

  useEffect(() => {
    if (isEmailVerificationOpen) {
      closeLogin();
      closeRegister();
      closeResetPassword();
      closeContactUs();
    }
  }, [isEmailVerificationOpen]);



  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isResetPasswordOpen,
        openLogin,
        openRegister,
        openResetPassword,
        closeLogin,
        closeRegister,
        closeResetPassword,
        isContactUs,
        openContactUs,
        closeContactUs,
        isEmailVerificationOpen,
        openEmailVerification,
        closeEmailVerification,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
