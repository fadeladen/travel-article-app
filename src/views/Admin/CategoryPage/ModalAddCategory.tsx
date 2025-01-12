import { BaseModal, Button, Input } from "../../../components/ui";
import { CategoryType } from "../../../types/CategoryTypes";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  apiPostCategory,
  apiPutCategory,
} from "../../../services/CategoryService";
import { CrossCircledIcon } from "@radix-ui/react-icons";

interface Props {
  data: CategoryType | undefined;
  isOpen: boolean;
  onClose: () => void;
  cb: () => void;
}

export interface CategoryForm {
  name: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const ModalAddCategory = (props: Props) => {
  const { isOpen, onClose, cb, data } = props;

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CategoryForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: data?.name || "",
    },
  });

  const onSubmit = async (payload: CategoryForm) => {
    try {
      if (data) {
        await apiPutCategory(data?.documentId, payload);
      } else {
        await apiPostCategory(payload);
      }
      toast.success(`Category ${data ? "updated" : "created"}`);
      cb?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error saving data category"
      );
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      isOpen={isOpen}
      width={400}
    >
      <div className="flex flex-col px-6 pb-8 pt-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Add category</h3>
          <div
            onClick={onClose}
            className="p-2 cursor-pointer"
          >
            <CrossCircledIcon
              width={24}
              height={24}
            />
          </div>
        </div>
        <form
          className="mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3 mb-5">
            <div>
              <Input
                label="Category"
                name="name"
                type="text"
                value={getValues("name")}
                onChange={(e) =>
                  setValue("name", e, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors?.name?.message}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              onClick={onClose}
              classname="bg-slate-200 border !text-slate-800 w-[100px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              classname="w-[100px]"
              disabled={!isValid || isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ModalAddCategory;
