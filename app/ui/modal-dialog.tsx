"use client";

import React, { useRef, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function ModalDialog({ isOpen, children, className }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      if (isDialogOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isDialogOpen]);

  return (
    <dialog ref={dialogRef} className={className + " m-auto"}>
      {children}
    </dialog>
  );
}
