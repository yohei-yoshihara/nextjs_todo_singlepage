import { getFilteredTasks } from "@/app/lib/actions";
import TaskRow from "@/app/ui/task-row";

type Props = {
  query: string;
  currentPage: number;
};

export default async function TaskTable({ query, currentPage }: Props) {
  const tasks = getFilteredTasks(query, currentPage);

  return (
    <ul className="text-gray-300 divide-y-2 divide-gray-600 divide-dotted">
      {(await tasks).map((task) => (
        <li key={task.id} className="py-2">
          <TaskRow task={task} />
        </li>
      ))}
    </ul>
  );
}
