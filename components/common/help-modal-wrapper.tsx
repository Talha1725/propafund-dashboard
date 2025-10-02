"use client";

import { useHelpModal } from "@/contexts/help-modal-context";
import HelpModal from "./help-modal";

export default function HelpModalWrapper() {
  const { isHelpModalOpen, closeHelpModal } = useHelpModal();
  
  
  return (
    <HelpModal 
      isOpen={isHelpModalOpen} 
      onClose={closeHelpModal} 
    />
  );
}
