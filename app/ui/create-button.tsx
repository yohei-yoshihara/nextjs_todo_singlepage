"use client";

import { useActionState, useState } from "react";
import { createTask, TaskState } from "../lib/actions";
import ModalDialog from "./modal-dialog";
import Form from "next/form";
import { MdErrorOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import TextField from "./text-field";
import Checkbox from "./checkbox";

export default function CreateButton() {
  async function createTaskClient(
    prevState: TaskState,
    formData: FormData
  ): Promise<TaskState> {
    const result = await createTask(prevState, formData);
    if (!result.errors && !result.message) {
      setOpen(false);
    }
    return result;
  }

  const initialState: TaskState = { message: null, errors: {} };
  const [errorMessage, formAction, isPending] = useActionState(
    createTaskClient,
    initialState
  );
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-2 py-1 bg-blue-500 flex flex-row items-center rounded-md">
        <IoMdAdd className="text-white mr-2" />
        <span className="text-white">Create</span>
      </button>

      <ModalDialog
        isOpen={isOpen}
        className="p-3 bg-zinc-600 rounded-xl shadow-xl w-96">
        <Form action={formAction}>
          <h1 className="text-lg font-bold text-gray-400">Edit Task</h1>

          <TextField
            label="Title"
            name="title"
            defaultValue=""
            errors={errorMessage.errors?.title}
            className="mb-3"
          />

          <TextField
            label="Description"
            name="description"
            defaultValue=""
            errors={errorMessage.errors?.description}
            className="mb-3"
          />

          <Checkbox
            label="Is completed?"
            name="completed"
            value="yes"
            defaultChecked={false}
            errors={errorMessage.errors?.completed}
            className="mb-3"
          />

          {/* Buttons */}
          <div className="flex flex-row justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              type="submit"
              disabled={isPending}>
              Create
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded-md"
              onClick={() => setOpen(false)}
              type="button">
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
