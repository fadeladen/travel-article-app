import { TrashIcon } from "@radix-ui/react-icons";
import BaseModal from "./BaseModal";
import Button from "./Button";
import { memo } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const ModalDelete = (props: Props) => {
  const { isOpen, onClose, onConfirm, loading } = props;
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col justify-center items-center text-center gap-6 px-12 py-8">
        <TrashIcon
          color="#dc2626"
          height={60}
          width={60}
        />
        <h3 className="text-lg font-medium">Delete confirmation</h3>
        <p className="text-sm">Are you sure want to delete this data?</p>
        <div className="flex justify-center items-center gap-2">
          <Button
            disabled={loading}
            onClick={onClose}
            classname="w-28 bg-slate-200 hover:bg-slate-300 border !text-slate-800"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={onConfirm}
            classname="w-28 bg-red-600"
          >
            Delete
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default memo(ModalDelete);
