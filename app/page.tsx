import { redirect } from "next/navigation";

export default function Home() {
  redirect("/tasks");
  return <div></div>;
}