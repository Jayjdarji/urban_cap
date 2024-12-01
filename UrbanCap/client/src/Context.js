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
  const [currency, setCurrency] = useState("USD");
  const [isRequestQuoteOpen, setIsRequestQuoteOpen] = useState(false);
  const [isExtraServiceModalOpen, setIsExtraServiceModalOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const openResetPassword = () => setIsResetPasswordOpen(true);
  const openContactUs = () => setIsContactUs(true);
  const openEmailVerification = () => setIsEmailVerificationOpen(true);
  const openRequestQuote = () => setIsRequestQuoteOpen(true);
  const openExtraServiceModal = () => setIsExtraServiceModalOpen(true);

  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);
  const closeResetPassword = () => setIsResetPasswordOpen(false);
  const closeContactUs = () => setIsContactUs(false);
  const closeEmailVerification = () => setIsEmailVerificationOpen(false);
  const closeRequestQuote = () => setIsRequestQuoteOpen(false);
  const closeExtraServiceModal = () => setIsExtraServiceModalOpen(false);

  useEffect(() => {
    if (isLoginOpen) {
      closeRegister();
      closeResetPassword();
      closeContactUs();
      closeEmailVerification();
      closeRequestQuote();
      closeExtraServiceModal();
    }
  }, [isLoginOpen]);

  useEffect(() => {
    if (isRegisterOpen) {
      closeLogin();
      closeResetPassword();
      closeContactUs();
      closeEmailVerification();
      closeRequestQuote();
      closeExtraServiceModal();
    }
  }, [isRegisterOpen]);

  useEffect(() => {
    if (isResetPasswordOpen) {
      closeLogin();
      closeRegister();
      closeContactUs();
      closeEmailVerification();
      closeRequestQuote();
      closeExtraServiceModal();
    }
  }, [isResetPasswordOpen]);

  useEffect(() => {
    if (isContactUs) {
      closeLogin();
      closeRegister();
      closeResetPassword();
      closeEmailVerification();
      closeRequestQuote();
      closeExtraServiceModal();
    }
  }, [isContactUs]);

  useEffect(() => {
    if (isEmailVerificationOpen) {
      closeLogin();
      closeRegister();
      closeResetPassword();
      closeContactUs();
      closeRequestQuote();
      closeExtraServiceModal();
    }
  }, [isEmailVerificationOpen]);

  useEffect(() => {
    if (isRequestQuoteOpen) {
      closeLogin();
      closeRegister();
      closeResetPassword();
      closeContactUs();
      closeEmailVerification();
      closeExtraServiceModal();
    }
  }, [isRequestQuoteOpen]);

  useEffect(() => {
    if (isExtraServiceModalOpen) {
      closeLogin();
      closeRegister();
      closeResetPassword();
      closeContactUs();
      closeEmailVerification();
      closeRequestQuote();
    }
  }, [isExtraServiceModalOpen]);

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
        currency,
        setCurrency,
        isRequestQuoteOpen,
        openRequestQuote,
        closeRequestQuote,
        isExtraServiceModalOpen,
        openExtraServiceModal,
        closeExtraServiceModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
