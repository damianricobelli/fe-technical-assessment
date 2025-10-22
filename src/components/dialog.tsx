import React from "react";
import { cx } from "class-variance-authority";
import { XIcon } from "lucide-react";

const DialogContext = React.createContext<Dialog.ContextValue | null>(null);

const useDialogContext = () => {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog.* must be used inside <Dialog.Root>");
  return ctx;
};

const Root = ({ children }: Dialog.RootProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
    setOpen(true);
  };

  const closeDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{ dialogRef, open, openDialog, closeDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};

const Trigger = ({ children, className }: Dialog.TriggerProps) => {
  const { openDialog } = useDialogContext();

  return (
    <button onClick={openDialog} type="button" className={className}>
      {children}
    </button>
  );
};

const Content = ({ children, className }: Dialog.ContentProps) => {
  const { dialogRef, closeDialog } = useDialogContext();

  return (
    <dialog
      ref={dialogRef}
      className={cx(
        "w-full max-w-md p-4 rounded-md border border-gray-300",
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "backdrop:backdrop-blur-xs",
        className
      )}
      onClose={closeDialog}
    >
      {children}
      <button onClick={closeDialog} className="absolute top-2 right-2">
        <XIcon className="size-4" />
      </button>
    </dialog>
  );
};

export const Dialog = {
  Root,
  Trigger,
  Content,
};

export namespace Dialog {
  export type ContextValue = {
    dialogRef: React.Ref<HTMLDialogElement>;
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
  };
  export type RootProps = {
    children: React.ReactNode;
  };
  export type TriggerProps = {
    children: React.ReactNode;
    className?: string;
  };
  export type ContentProps = {
    children: React.ReactNode;
    className?: string;
  };
}
