// import { getTasks } from "@/app/lib/actions";
// import TaskRow from "@/app/ui/task-row";
import CreateButton from "@/app/ui/create-button";
import TaskTable from "../ui/task-table";
import { getTasksPages } from "../lib/actions";
import Pagination from "../ui/pagination";
import SearchBar from "../ui/searchbar";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function TaskListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = sp?.query || "";
  const currentPage = Number(sp?.page) || 1;

  const totalPages = await getTasksPages(query);

  return (
    <div className="m-5">
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-gray-300 font-bold">Task List</h1>
        <CreateButton />
      </div>
      <div className="mb-5">
        <SearchBar />
      </div>
      <TaskTable query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
