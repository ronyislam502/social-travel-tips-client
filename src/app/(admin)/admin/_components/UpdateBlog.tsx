import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

import { TErrorResponse } from "@/src/types";
import CustomModal from "@/src/components/ui/CustomModal";
import Dropdown from "@/src/components/formik/Dropdown";
import { useUpdatePostMutation } from "@/src/redux/features/post/postApi";

const statusOptions = [
  {
    value: "true",
    name: "Active",
  },
  {
    value: "false",
    name: "In active",
  },
];

const UpdateBlog = ({ postId }: { postId: string }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [updatePost] = useUpdatePostMutation();

  const handleSubmit = async (values: { status: string }) => {
    const toastId = toast.loading("Post status updating!");

    // Create a new FormData object
    const formData = new FormData();

    // Serialize the object and append it as a JSON string
    const data = {
      isActive: values.status,
    };

    formData.append("data", JSON.stringify(data));

    try {
      setIsUpdateModalOpen(false);

      // Send formData with JSON stringified data
      const res = await updatePost({ id: postId, data: formData }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      setIsUpdateModalOpen(false);
      const err = error as TErrorResponse;

      toast.error(err.data.errorMessages[0].message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Button
        color="primary"
        size="sm"
        onClick={() => setIsUpdateModalOpen(true)}
      >
        Edit
      </Button>
      <CustomModal
        footer={false}
        isOpen={isUpdateModalOpen}
        title="Update post visibility"
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <div>
          <Formik initialValues={{ status: "" }} onSubmit={handleSubmit}>
            {() => (
              <Form className="space-y-5 mb-4">
                <Dropdown name="status" options={statusOptions} />
                <Button
                  fullWidth
                  className="custom-btn-secondary"
                  type="submit"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </>
  );
};

export default UpdateBlog;
