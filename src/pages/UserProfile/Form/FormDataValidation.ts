import * as yup from "yup";

export const inputValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .max(40, "First name must be 40 characters or less."),
  lastName: yup
    .string()
    .trim()
    .max(40, "Last name must be 40 characters or less."),
  newEmail: yup
    .string()
    .email("Please enter a valid email address (e.g. email@example.com)."),
  currentPassword: yup
    .string()
    .test(
      "is-not-empty-when-new-password",
      "Previous password is required when changing password.",
      function (value) {
        const { newPassword } = this.parent;
        if (!newPassword) return true;

        return value !== undefined && value !== null && value !== "";
      }
    ),
  newPassword: yup
    .string()
    .test(
      "is-not-empty-when-current-password",
      "New password is required when changing password.",
      function (value) {
        const { currentPassword } = this.parent;
        if (!currentPassword) return true;
        return value !== undefined && value !== null && value !== "";
      }
    )
    .test(
      "is-not-current-password",
      "New password cannot be the same as current password.",
      function (value) {
        const { currentPassword } = this.parent;
        if (!currentPassword) return true;
        return value !== this.parent.currentPassword;
      }
    ),
  confirmDelete: yup
    .string()
    .oneOf(
      ["", "delete profile"],
      "Please type 'delete profile' to confirm deletion, or leave blank."
    ),
});
