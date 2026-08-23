// import DialogBox from '@/components/dialog'
// import React from 'react'

// export default function AttributesPage() {
//   return (
//     <div>AttributesPage
// {/* 

// Product Attributes

//                          [+ Attribute]

// Brand
// ────────────────────────
// Canon
// Sony
// Nikon
//                        [+ Value]

// Color
// ────────────────────────
// Black
// White
// Silver
//                        [+ Value]
// */}


// {/* 
// Dialog → Create Attribute
// Dialog → Edit Attribute

// Dialog → Add Value
// Dialog → Edit Value

// AlertDialog → Delete
// */}

// <div className='flex justify-end m-2'>
// <DialogBox  title="Create Attribute"/>
// <DialogBox  title="Edit Attribute"/>
// <DialogBox  title="Add value"/>
// <DialogBox  title="Edit Value"/>
// <DialogBox  title="Delete"/>
// </div>



//     </div>
//   )
// }

"use client"

import { useState } from "react"
import {
  Edit2,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AttributeValue = {
  id: string
  name: string
}

type ProductAttribute = {
  id: string
  name: string
  values: AttributeValue[]
}

type DialogState =
  | { type: "closed" }
  | { type: "create-attribute" }
  | { type: "edit-attribute"; attribute: ProductAttribute }
  | { type: "add-value"; attribute: ProductAttribute }
  | {
      type: "edit-value"
      attribute: ProductAttribute
      value: AttributeValue
    }

type DeleteState =
  | { type: "closed" }
  | { type: "attribute"; attribute: ProductAttribute }
  | {
      type: "value"
      attribute: ProductAttribute
      value: AttributeValue
    }

const initialAttributes: ProductAttribute[] = [
  {
    id: "attribute-1",
    name: "Brand",
    values: [
      { id: "value-1", name: "Canon" },
      { id: "value-2", name: "Sony" },
      { id: "value-3", name: "Nikon" },
    ],
  },
  {
    id: "attribute-2",
    name: "Color",
    values: [
      { id: "value-4", name: "Black" },
      { id: "value-5", name: "White" },
      { id: "value-6", name: "Silver" },
    ],
  },
]

export default function AttributesPage() {
  const [attributes, setAttributes] =
    useState<ProductAttribute[]>(initialAttributes)

  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const [dialog, setDialog] = useState<DialogState>({ type: "closed" })
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    type: "closed",
  })

  const filteredAttributes = attributes.filter((attribute) => {
    const query = search.toLowerCase()

    return (
      attribute.name.toLowerCase().includes(query) ||
      attribute.values.some((value) =>
        value.name.toLowerCase().includes(query)
      )
    )
  })

  function openDialog(nextDialog: DialogState, initialName = "") {
    setName(initialName)
    setDialog(nextDialog)
  }

  function closeDialog() {
    setDialog({ type: "closed" })
    setName("")
  }

  function handleSubmit() {
    const trimmedName = name.trim()

    if (!trimmedName || dialog.type === "closed") return

    if (dialog.type === "create-attribute") {
      setAttributes((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          name: trimmedName,
          values: [],
        },
      ])
    }

    if (dialog.type === "edit-attribute") {
      setAttributes((current) =>
        current.map((attribute) =>
          attribute.id === dialog.attribute.id
            ? { ...attribute, name: trimmedName }
            : attribute
        )
      )
    }

    if (dialog.type === "add-value") {
      setAttributes((current) =>
        current.map((attribute) =>
          attribute.id === dialog.attribute.id
            ? {
                ...attribute,
                values: [
                  ...attribute.values,
                  {
                    id: crypto.randomUUID(),
                    name: trimmedName,
                  },
                ],
              }
            : attribute
        )
      )
    }

    if (dialog.type === "edit-value") {
      setAttributes((current) =>
        current.map((attribute) =>
          attribute.id === dialog.attribute.id
            ? {
                ...attribute,
                values: attribute.values.map((value) =>
                  value.id === dialog.value.id
                    ? { ...value, name: trimmedName }
                    : value
                ),
              }
            : attribute
        )
      )
    }

    closeDialog()
  }

  function handleDelete() {
    if (deleteDialog.type === "attribute") {
      setAttributes((current) =>
        current.filter(
          (attribute) => attribute.id !== deleteDialog.attribute.id
        )
      )
    }

    if (deleteDialog.type === "value") {
      setAttributes((current) =>
        current.map((attribute) =>
          attribute.id === deleteDialog.attribute.id
            ? {
                ...attribute,
                values: attribute.values.filter(
                  (value) => value.id !== deleteDialog.value.id
                ),
              }
            : attribute
        )
      )
    }

    setDeleteDialog({ type: "closed" })
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Product Attributes
          </h1>
          <p className="text-muted-foreground">
            Manage product options such as brand, color and size.
          </p>
        </div>

        <Button
          onClick={() => openDialog({ type: "create-attribute" })}
        >
          <Plus className="mr-2 size-4" />
          Create attribute
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search attributes or values..."
          className="pl-9"
        />
      </div>

      {filteredAttributes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAttributes.map((attribute) => (
            <Card key={attribute.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">
                    {attribute.name}
                  </CardTitle>
                  <CardDescription>
                    {attribute.values.length}{" "}
                    {attribute.values.length === 1 ? "value" : "values"}
                  </CardDescription>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">
                        Attribute actions
                      </span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        openDialog(
                          {
                            type: "edit-attribute",
                            attribute,
                          },
                          attribute.name
                        )
                      }
                    >
                      <Edit2 className="mr-2 size-4" />
                      Edit attribute
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() =>
                        setDeleteDialog({
                          type: "attribute",
                          attribute,
                        })
                      }
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete attribute
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent className="space-y-2">
                {attribute.values.length > 0 ? (
                  attribute.values.map((value) => (
                    <div
                      key={value.id}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <span className="text-sm font-medium">
                        {value.name}
                      </span>

                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() =>
                            openDialog(
                              {
                                type: "edit-value",
                                attribute,
                                value,
                              },
                              value.name
                            )
                          }
                        >
                          <Edit2 className="size-3.5" />
                          <span className="sr-only">Edit value</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive size-8"
                          onClick={() =>
                            setDeleteDialog({
                              type: "value",
                              attribute,
                              value,
                            })
                          }
                        >
                          <Trash2 className="size-3.5" />
                          <span className="sr-only">Delete value</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground py-4 text-center text-sm">
                    No values added yet.
                  </p>
                )}

                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() =>
                    openDialog({
                      type: "add-value",
                      attribute,
                    })
                  }
                >
                  <Plus className="mr-2 size-4" />
                  Add value
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <SlidersHorizontal className="text-muted-foreground mx-auto mb-3 size-10" />
            <h2 className="font-semibold">No attributes found</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Create an attribute or change your search.
            </p>
          </CardContent>
        </Card>
      )}

      <AttributeFormDialog
        dialog={dialog}
        name={name}
        onNameChange={setName}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmation
        state={deleteDialog}
        onClose={() => setDeleteDialog({ type: "closed" })}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function AttributeFormDialog({
  dialog,
  name,
  onNameChange,
  onClose,
  onSubmit,
}: {
  dialog: DialogState
  name: string
  onNameChange: (value: string) => void
  onClose: () => void
  onSubmit: () => void
}) {
  if (dialog.type === "closed") return null

  const config = {
    "create-attribute": {
      title: "Create attribute",
      description: "Create a new product attribute.",
      label: "Attribute name",
      placeholder: "For example, Size",
      submit: "Create attribute",
    },
    "edit-attribute": {
      title: "Edit attribute",
      description: "Update this product attribute.",
      label: "Attribute name",
      placeholder: "Enter attribute name",
      submit: "Save changes",
    },
    "add-value": {
      title: "Add value",
      description: `Add a value to ${dialog.type === "add-value" ? dialog.attribute.name : ""}.`,
      label: "Value name",
      placeholder: "For example, Large",
      submit: "Add value",
    },
    "edit-value": {
      title: "Edit value",
      description: "Update this attribute value.",
      label: "Value name",
      placeholder: "Enter value",
      submit: "Save changes",
    },
  }[dialog.type]

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="attribute-name">{config.label}</Label>
            <Input
              id="attribute-name"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder={config.placeholder}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {config.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteConfirmation({
  state,
  onClose,
  onConfirm,
}: {
  state: DeleteState
  onClose: () => void
  onConfirm: () => void
}) {
  if (state.type === "closed") return null

  const itemName =
    state.type === "attribute"
      ? state.attribute.name
      : state.value.name

  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
            {state.type === "attribute"
              ? "This will also delete every value belonging to this attribute."
              : "This attribute value will be permanently deleted."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}