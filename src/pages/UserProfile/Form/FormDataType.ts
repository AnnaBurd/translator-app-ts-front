// import * as yup from "yup";
// import { inputValidationSchema } from "./FormDataValidation";

// export type FormData = yup.InferType<typeof inputValidationSchema>;

export type FormDataType = {
  firstName: string | undefined;
  lastName: string | undefined;
  newEmail: string | undefined;
  currentPassword: string | undefined;
  newPassword: string | undefined;
  confirmDelete: string | undefined;
  selectedImage: File | undefined;
};
