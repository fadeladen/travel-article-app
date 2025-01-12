import Button from "./Button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

interface ActionColumnProps<T> {
  row: T | undefined;
  setRow: (row: T | undefined) => void;
  setOpenDialogDelete: (val: boolean) => void;
  setOpenDialogEdit: (val: boolean) => void;
}

const ActionColumn = <T,>(props: ActionColumnProps<T>) => {
  const { setRow, row, setOpenDialogDelete, setOpenDialogEdit } = props;

  const handleClickDelete = () => {
    setRow(row);
    setOpenDialogDelete(true);
  };

  const handleClickEdit = () => {
    setRow(row);
    setOpenDialogEdit(true);
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={handleClickDelete}
        classname="bg-transparent hover:bg-red-200 w-10 h-10"
      >
        <TrashIcon
          height={18}
          width={18}
          color="#dc2626"
        />
      </Button>
      <Button
        onClick={handleClickEdit}
        classname="bg-transparent hover:bg-blue-200 w-10 h-10"
      >
        <Pencil2Icon
          height={18}
          width={18}
          color="#06b6d4"
        />
      </Button>
    </div>
  );
};
export default ActionColumn;
