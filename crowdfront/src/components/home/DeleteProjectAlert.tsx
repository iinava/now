import ConfirmationAlert from "@/components/ui/ConfirmationAlert";

interface DeleteProjectAlertProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteProjectAlert({ isOpen, onOpenChange, onConfirm }: DeleteProjectAlertProps) {
  return (
    <ConfirmationAlert
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete your project."
      confirmText="Delete"
    />
  );
} 