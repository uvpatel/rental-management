import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



import { Button } from "./ui/button"

export default function DialogBox({title, description, actionText, cancelText}: {title?: string, description?: string, actionText?: string, cancelText?: string}) {
  return (
    <>
    <AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
   {title || "Open Dialog"}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
      <AlertDialogDescription>
        {description || "This action cannot be undone. This will permanently delete your account from our servers."}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>{cancelText || "Cancel"}</AlertDialogCancel>
      <AlertDialogAction>{actionText || "Continue"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>
  )
}
