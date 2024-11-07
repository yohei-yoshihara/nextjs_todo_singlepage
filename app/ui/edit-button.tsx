"use client";

import { useActionState, useState } from "react";
import Form from "next/form";
import ModalDialog from "./modal-dialog";
import { MdEdit } from "react-icons/md";
import { Task } from "@prisma/client";
import { updateTask, TaskState } from "../lib/actions";
import { MdErrorOutline } from "react-icons/md";
import TextField from "./text-field";
import Checkbox from "./checkbox";

type Props = {
  task: Task;
};

export default function EditButton({ task }: Props) {
  async function updateTaskClient(
    id: number,
    prevState: TaskState,
    formData: FormData
  ): Promise<TaskState> {
    // this is the wrapper function for the server action
    // in order to close the modal dialog.
    const result = await updateTask(id, prevState, formData);
    if (!result.errors && !result.message) {
      // if there is no error, close the modal dialog.
      setOpen(false);
    }
    return result;
  }

  const initialState: TaskState = { message: null, errors: {} };
  const updateTaskWithId = updateTaskClient.bind(null, task.id);
  const [errorMessage, formAction, isPending] = useActionState(
    updateTaskWithId,
    initialState
  );
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdEdit className="text-blue-400" />
      </button>

      <ModalDialog
        isOpen={isOpen}
        className="p-3 bg-zinc-600 rounded-xl shadow-xl w-96">
        <Form action={formAction}>
          <h1 className="text-lg font-bold text-gray-400">Edit Task</h1>

          <TextField
            label="Title"
            name="title"
            defaultValue={task.title}
            errors={errorMessage.errors?.title}
            className="mb-3"
          />

          <TextField
            label="Description"
            name="description"
            defaultValue={task.description}
            errors={errorMessage.errors?.description}
            className="mb-3"
          />

          <Checkbox
            label="Is completed?"
            name="completed"
            value="yes"
            defaultChecked={task.completed}
            errors={errorMessage.errors?.completed}
            className="mb-3"
          />

          {/* Buttons */}
          <div className="flex flex-row justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              type="submit"
              disabled={isPending}>
              Update
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded-md"
              onClick={() => setOpen(false)}
              type="button"
              disabled={isPending}>
              Cancel
            </button>
          </div>

          {errorMessage?.message && (
            <div className="flex flex-row">
              <div className="w-1/3"></div>
              <div
                className="w-2/3 flex h-8 items-end space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true">
                <MdErrorOutline className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage.message}</p>
              </div>
            </div>
          )}
        </Form>
      </ModalDialog>
    </div>
  );
}
