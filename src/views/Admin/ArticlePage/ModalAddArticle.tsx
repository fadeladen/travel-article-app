import { BaseModal, Button, Input, Select } from "../../../components/ui";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { ArticleType } from "../../../types/ArticleTypes";
import {
  apiPostArticle,
  apiPutArticle,
  apiUpload,
} from "../../../services/ArticleService";
import { OptionType } from "../../../types/MetaTypes";
import { useState } from "react";

interface Props {
  data: ArticleType | undefined;
  isOpen: boolean;
  onClose: () => void;
  cb: () => void;
  categoryOptions?: OptionType[];
}

export interface ArticleForm {
  title: string;
  description: string;
  cover_image_url?: string;
  category: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Title is required"),
  cover_image_url: yup.string(),
  category: yup.string().required("Title is required"),
});

const ModalAddArticle = (props: Props) => {
  const { isOpen, onClose, cb, data, categoryOptions = [] } = props;
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ArticleForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      cover_image_url: data?.cover_image_url || "",
      category: data?.category?.id.toString() || "",
    },
  });

  const onSubmit = async (payload: ArticleForm) => {
    try {
      if (data) {
        await apiPutArticle(data?.documentId, payload);
      } else {
        await apiPostArticle(payload);
      }
      toast.success(`Article ${data ? "updated" : "created"}`);
      cb?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error saving data article"
      );
    }
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    try {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const formData = new FormData();
        formData.append("files", selectedFile as Blob);
        const resp = await apiUpload(formData);
        setValue("cover_image_url", resp?.[0]?.url, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error uploading file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      width={800}
    >
      <div className="flex flex-col px-6 pb-8 pt-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Add article</h3>
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
                label="Title"
                name="title"
                type="text"
                value={getValues("title")}
                onChange={(e) =>
                  setValue("title", e, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors?.title?.message}
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="inline-block text-xs mb-2">Cover image</label>
                <input
                  disabled={isUploading}
                  className="text-xs bg-slate-100 active:outline-none focus:outline-none rounded-lg p-3 flex-1"
                  accept=".png,.jpg,.jpeg"
                  name="cover_image_url"
                  type="file"
                  onChange={handleUploadCover}
                />
              </div>
              <div className="flex-1 flex justify-center items-center">
                {isUploading ? (
                  <div className="text-xs text-center">Uploading...</div>
                ) : (
                  <img
                    src={getValues("cover_image_url")}
                    className="max-w-28 h-16 object-cover mx-auto rounded-lg"
                  />
                )}
              </div>
            </div>
            <div>
              <Input
                label="Description"
                name="description"
                textArea
                type="text"
                value={getValues("description")}
                onChange={(e) =>
                  setValue("description", e, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors?.description?.message}
              />
            </div>
            <div>
              <Select
                label="Category"
                name="category"
                value={getValues("category")}
                options={categoryOptions}
                onChange={(e) =>
                  setValue("category", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors?.category?.message}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              disabled={isUploading}
              onClick={onClose}
              classname="bg-slate-200 border !text-slate-800 w-[100px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              classname="w-[100px]"
              disabled={!isValid || isSubmitting || isUploading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ModalAddArticle;
