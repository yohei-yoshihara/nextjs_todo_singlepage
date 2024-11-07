import { Task } from "@prisma/client";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

type Props = {
  task: Task;
};

export default function TaskRow({ task }: Props) {
  return (
    <>
      <div className="flex flex-row items-center">
        <div className="w-1/4">{task.title}</div>
        <div className="w-2/4 truncate">{task.description}</div>
        <div className="w-1/4">
          <div className="flex flex-row items-center space-x-2">
            {task.completed ? (
              <FaRegCircleCheck className="text-green-300" />
            ) : (
              <FaRegCircle className="text-gray-500" />
            )}
            <EditButton task={task} />
            <DeleteButton taskId={task.id} />
          </div>
        </div>
      </div>
    </>
  );
}
