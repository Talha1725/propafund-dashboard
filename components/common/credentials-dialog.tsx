"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import { Copy, Link } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import credentialsIcon from "@/public/assets/credentials-icon.svg";
import TrashIcon from "@/public/images/trash-icon.svg";
import type { CredentialsDialogProps } from "../../types/common";
import { CREDENTIAL_FIELDS } from "@/constants/accounts";

const DIALOG_STYLES = {
  content: "p-4 bg-gradient-to-b from-[#161617] to-[#09090B] border-white/10 z-[999999]",
  header: "flex gap-2 items-start border-b border-white/10 pb-4",
  title: "text-white font-lay-grotesk text-lg",
  accountId: "text-white font-lay-grotesk text-sm",
  fieldRow: "grid grid-cols-2 text-sm",
  fieldLabel: "font-lay-grotesk text-white/50",
  fieldValue: "font-lay-grotesk text-white",
  fieldContainer: "flex gap-2 items-center",
  copyIcon: "text-white w-4 h-4 cursor-pointer",
  platformIcon: "text-white w-4 h-4",
  deleteRow: "grid grid-cols-2 mt-2 text-sm items-center",
  deleteButton: "flex items-center gap-1.5 border-t border-[#C193F6] border-b border-[#3B65CF] border-l border-[#3B65CF] border-r border-[#3B65CF]"
} as const;

export const CredentialsDialog = memo<CredentialsDialogProps>(({
  isOpen,
  onOpenChange,
  accountId,
  username,
  password,
  server,
  platform,
  showDeleteButton = false,
  onDelete
}) => {
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard?.writeText(text);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const credentials = { username, password, server };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_STYLES.content}>
        <DialogHeader>
          <DialogTitle className="sr-only">Account Credentials</DialogTitle>
          <div className={DIALOG_STYLES.header}>
            <Image src={credentialsIcon} alt="credentials-icon" />
            <div>
              <h1 className={DIALOG_STYLES.title}>
                Account Credentials
              </h1>
              <p className={DIALOG_STYLES.accountId}>#{accountId}</p>
            </div>
          </div>
        </DialogHeader>
        <div>
          {CREDENTIAL_FIELDS.map(({ key, label }) => (
            <div key={key} className={DIALOG_STYLES.fieldRow}>
              <p className={DIALOG_STYLES.fieldLabel}>{label}</p>
              <div className={DIALOG_STYLES.fieldContainer}>
                <p className={DIALOG_STYLES.fieldValue}>{credentials[key]}</p>
                <Copy 
                  className={DIALOG_STYLES.copyIcon}
                  onClick={() => handleCopy(credentials[key])}
                />
              </div>
            </div>
          ))}
          
          {platform && (
            <div className={DIALOG_STYLES.fieldRow}>
              <p className={DIALOG_STYLES.fieldLabel}>Platform</p>
              <div className={DIALOG_STYLES.fieldContainer}>
                <p className={DIALOG_STYLES.fieldValue}>{platform}</p>
                <Link className={DIALOG_STYLES.platformIcon} />
              </div>
            </div>
          )}
          
          {showDeleteButton && (
            <div className={DIALOG_STYLES.deleteRow}>
              <p className={DIALOG_STYLES.fieldLabel}>Delete Account</p>
              {/* <Button
                variant="lightPurpleGradient"
                className={DIALOG_STYLES.deleteButton}
                onClick={handleDelete}
              >
                <Image src={TrashIcon} alt="trash-icon" />
                <p>Delete Account</p>
              </Button> */}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

CredentialsDialog.displayName = "CredentialsDialog";
