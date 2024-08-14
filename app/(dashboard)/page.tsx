import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadCrumbNav } from "../_components/breadcrumb";
import { ButtonMovingBorder } from "@/components/ui/moving-border";

export default function Dashboard() {
  return (
    <div className="w-full h-full bg-gray-200  p-6">
      <ButtonMovingBorder
        borderRadius="0.5rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Dashboard
      </ButtonMovingBorder>
    </div>
  );
}
