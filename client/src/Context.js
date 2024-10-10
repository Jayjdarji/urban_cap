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

  // Handlers for opening modals
  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const openResetPassword = () => setIsResetPasswordOpen(true);
  const openContactUs = () => setIsContactUs(true);

  // Handlers for closing modals
  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);
  const closeResetPassword = () => setIsResetPasswordOpen(false);
  const closeContactUs = () => setIsContactUs(false);

  useEffect(() => {
    if (isLoginOpen) {
      closeRegister();
      closeResetPassword();
      closeContactUs();
    }
  }, [isLoginOpen]);

  useEffect(() => {
    if (isRegisterOpen) {
      closeLogin();
      closeResetPassword();
      closeContactUs();
    }
  }, [isRegisterOpen]);

  useEffect(() => {
    if (isResetPasswordOpen) {
      closeLogin();
      closeRegister();
      closeContactUs();
    }
  }, [isResetPasswordOpen]);

  useEffect(() => {
    if (isContactUs) {
      closeLogin();
      closeRegister();
      closeResetPassword();
    }
  }, [isContactUs]);

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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
