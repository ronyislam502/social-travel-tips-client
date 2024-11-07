"use client";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

import Dropdown from "@/src/components/formik/Dropdown";
import CustomModal from "@/src/components/ui/CustomModal";
import { useUpdateUserInfoMutation } from "@/src/redux/features/user/userApi";
import { TError } from "@/src/types/global";

const statusOptions = [
  {
    value: "user",
    name: "User",
  },
  {
    value: "admin",
    name: "Admin",
  },
];

const UpdateUser = ({ userId }: { userId: string }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateUser] = useUpdateUserInfoMutation();
  const handleSubmit = async (values: { status: string }) => {
    const toastId = toast.loading("User status updating!");
    const data = {
      role: values.status,
    };

    try {
      setIsUpdateModalOpen(false);
      const res = await updateUser({ id: userId, data }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      //   console.log(error);
      setIsUpdateModalOpen(false);
      const err = error as TError;

      toast.error(err.data.message || "Something went wrong", {
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
        title="Update role"
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

export default UpdateUser;
