import { columns } from "./columns";
import { DataTable } from "./data-table";
import { promises as fs } from "fs";

const TodoTable = async () => {
  const file = await fs.readFile(process.cwd() + "/data/todos.json", "utf8");
  const data = JSON.parse(file);
  console.log(data);
  return (
    <div className="mt-5">
      <DataTable columns={columns} data={data.tasks} />
    </div>
  );
};

export default TodoTable;
