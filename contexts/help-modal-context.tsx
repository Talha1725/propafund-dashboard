"use client";

import React, { createContext, useContext, useState } from 'react';

interface HelpModalContextType {
  isHelpModalOpen: boolean;
  openHelpModal: () => void;
  closeHelpModal: () => void;
}

const HelpModalContext = createContext<HelpModalContextType | undefined>(undefined);

export function HelpModalProvider({ children }: { children: React.ReactNode }) {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const openHelpModal = () => {
    console.log('Opening help modal, current state:', isHelpModalOpen);
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  return (
    <HelpModalContext.Provider value={{ isHelpModalOpen, openHelpModal, closeHelpModal }}>
      {children}
    </HelpModalContext.Provider>
  );
}

export function useHelpModal() {
  const context = useContext(HelpModalContext);
  if (context === undefined) {
    throw new Error('useHelpModal must be used within a HelpModalProvider');
  }
  return context;
}
