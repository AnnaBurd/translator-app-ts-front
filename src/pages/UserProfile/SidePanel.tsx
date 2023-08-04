import ErrorNotification from "../Editor/TextEditor/Notifications/ErrorNotification";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormDataType } from "./Form/FormDataType";

import Config from "../../../config.json";

type SidePanelProps = {
  firstName: string;
  lastName: string;
  email: string;
  registeredSince: Date;
  photoUrl: string;
  uploadedPhotos: FileList | undefined;
  // onPhotoUpload: (photo: File) => void;
  registerFormFields: UseFormRegister<FormDataType>;
  formErrors: FieldErrors<FormDataType>;
};

const SidePanel: React.FC<SidePanelProps> = ({
  firstName,
  lastName,
  email,
  photoUrl,
  registeredSince,
  uploadedPhotos,
  // onPhotoUpload,
  registerFormFields,
  formErrors,
}) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  // const [errorUploadingPhoto, setErrorUploadingPhoto] = useState("");

  // const handlePhotoUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   console.log("handlePhotoUpload", event);
  //   setErrorUploadingPhoto("");

  //   if (!event.target.files) {
  //     setErrorUploadingPhoto("Please select an image file");
  //     return;
  //   }

  //   const imageFile = event.target.files[0];

  //   if (imageFile.size > 1000000) {
  //     setErrorUploadingPhoto("Image file size must be less than 1MB");
  //     return;
  //   }

  //   console.log("uploading photo", imageFile);

  //   onPhotoUpload(imageFile);
  // };

  // console.log("SidePanel - uploaded photo", uploadedPhotos);

  const currentPhotoUrl = photoUrl
    ? `${Config.STATIC_URL}/${photoUrl}`
    : `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=ffffff&color=718398&name=${
        (firstName && firstName[0]) || ""
      }`;

  return (
    <div className="flex h-full flex-col items-center justify-between gap-12">
      <div className="flex flex-col items-center justify-start">
        <p className="whitespace-no-wrap -mb-.5 text-center text-2xl font-bold tracking-tight text-slate-700">
          {firstName} {lastName}
        </p>
        <span className="mb-8 text-xs font-light tracking-wide text-[--color-primary]">
          {email}
        </span>
        <div className="mb-3 h-24 w-24">
          <img
            className="h-full w-full rounded-full"
            src={
              uploadedPhotos && uploadedPhotos?.length > 0
                ? URL.createObjectURL(uploadedPhotos[0])
                : currentPhotoUrl
            }
            alt="profile photo preview"
          />
        </div>
        <label
          htmlFor="photo-upload"
          className="inline-block cursor-pointer rounded-md border border-indigo-400 bg-indigo-400 px-3 py-1.5 text-xs font-normal text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
        >
          <input
            id="photo-upload"
            type="file"
            accept="image/png, image/jpeg"
            multiple={false}
            {...registerFormFields("selectedImage")}
            // onChange={handlePhotoUpload}
            className="hidden"
          />
          Upload New Photo
        </label>
        <div className="mt-2">
          <ErrorNotification
            message={formErrors.selectedImage?.message || ""}
          />
        </div>
      </div>
      <div className="text-sm text-slate-600  ">
        Member since:{" "}
        <span className="font-bold tracking-tight">
          {registeredSince.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default SidePanel;
