import { redirect } from "next/navigation";

/** Legacy entry — team command center lives at /manager/overview */
export default function ManagerPage() {
  redirect("/manager/overview");
}

