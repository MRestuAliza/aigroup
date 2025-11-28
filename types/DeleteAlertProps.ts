export interface DeleteAlertProps {
  title: string;
  type: string;
  trigger: React.ReactNode;
  onConfirm: () => void;
  isDeleting?: boolean;
}