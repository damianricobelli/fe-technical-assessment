import { cx } from "class-variance-authority";
import { PlusIcon } from "lucide-react";
import { Dialog } from "../../components/dialog";

export const NewWorkflowDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cx(
          "flex items-center justify-center gap-1.5",
          "px-2 py-1 rounded-md border border-border",
          "font-bold text-body-xs-semibold",
          "hover:bg-border transition-colors duration-200",
          "appearance-none outline-none",
          "focus:ring-2 focus:ring-blue",
          "cursor-pointer"
        )}
      >
        New
        <PlusIcon className="size-3" />
      </Dialog.Trigger>
      <Dialog.Content>
        <h2 className="text-lg font-bold">New Workflow</h2>
        <p className="text-sm text-secondary">
          Create a new workflow to get started.
        </p>
      </Dialog.Content>
    </Dialog.Root>
  );
};
