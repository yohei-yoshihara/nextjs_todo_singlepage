"use server";

// タスクのためのサーバーアクション

import db from "@/app/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export type TaskState = {
  errors?: {
    title?: string[];
    description?: string[];
    completed?: string[];
  };
  message?: string | null;
};

// checkboxの検証
// https://github.com/edmundhung/conform/issues/107
const CreateTask = z.object({
  title: z
    .string({ message: "タイトルは必須です" })
    .min(1, { message: "タイトルは必須です" }),
  description: z
    .string({ message: "説明は必須です" })
    .min(1, { message: "説明は必須です" }),
  completed: z.preprocess((value) => value === "yes", z.boolean()),
});

export async function createTask(
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    completed: formData.get("completed"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力項目に誤りがあります",
    };
  }

  const { title, description, completed } = validatedFields.data;

  try {
    await db.task.create({
      data: {
        title,
        description,
        completed,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: "タスクの作成に失敗しました" };
  }

  revalidatePath("/tasks");
  return {};
}

const UpdateTask = z.object({
  title: z
    .string({ message: "タイトルは必須です" })
    .min(1, { message: "タイトルは必須です" }),
  description: z
    .string({ message: "説明は必須です" })
    .min(1, { message: "説明は必須です" }),
  completed: z.preprocess((value) => value === "yes", z.boolean()),
});

export async function updateTask(
  id: number,
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const validatedFields = UpdateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    completed: formData.get("completed"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力項目に誤りがあります",
    };
  }

  const { title, description, completed } = validatedFields.data;

  try {
    await db.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        completed,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: "タスクの更新に失敗しました" };
  }

  revalidatePath("/");
  return {};
}

export async function deleteTask(id: number) {
  try {
    await db.task.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  } catch (e) {
    console.error(e);
    return { message: "タスクの削除に失敗しました" };
  }
  return {};
}

export async function getTasks() {
  const tasks = await db.task.findMany();
  return tasks;
}

export async function getTask(taskId: number) {
  const task = await db.task.findUnique({ where: { id: taskId } });
  return task;
}

const ITEMS_PER_PAGE = 6;

export async function getFilteredTasks(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const tasks = await db.task.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    where: {
      title: {
        contains: query,
      },
      description: {
        contains: query,
      },
    },
  });
  return tasks;
}

export async function getTasksPages(query: string) {
  const count = await db.task.count({
    where: {
      title: {
        contains: query,
      },
      description: {
        contains: query,
      },
    },
  });
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  return totalPages;
}
