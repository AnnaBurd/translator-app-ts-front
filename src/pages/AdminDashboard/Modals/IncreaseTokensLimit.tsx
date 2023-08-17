import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../../components/UI/Modal";
import DotLoader from "../../../components/Loaders/DotLoader";
import { useState } from "react";
import useFetchPrivate from "../../../hooks/useFetchPrivate";
import ErrorNotification from "../../Editor/TextEditor/Notifications/ErrorNotification";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IncreaseTokensLimitOption from "./IncreaseTokensLimitOption";

type IncreaseTokensLimitModalProps = {
  email: string;
  onClose: () => void;
  onSuccess: (addedTokens: number) => void;
};

const increaseLimitOptions = ["Standart", "Comfort", "Premium"];

const inputValidationSchema = yup
  .object({
    planOption: yup
      .string()
      .trim()
      .oneOf(
        increaseLimitOptions,
        "Please select one of the available plans to add tokens"
      )
      .required("Please select one of the available plans to add tokens"),
  })
  .required();

export type FormData = {
  planOption: string;
};

const IncreaseTokensLimitModal: React.FC<IncreaseTokensLimitModalProps> = ({
  email,
  onClose,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: inputErrors },
  } = useForm<FormData>({
    defaultValues: {
      planOption: "Standart",
    },
    resolver: yupResolver(inputValidationSchema),
  });

  const fetchPrivate = useFetchPrivate();
  const [isFetching, setIsFetching] = useState(false);
  const [errorAddingTokens, setErrorAddingTokens] = useState("");

  const increaseLimitHandler = async (data: FormData) => {
    try {
      setIsFetching(true);
      setErrorAddingTokens("");
      const responseData = await fetchPrivate(`users/${email}`, "PATCH", data);

      const { tokensLimit: newTokensLimit } = responseData;

      onSuccess(parseInt(newTokensLimit));

      setIsFetching(false);
    } catch (error) {
      setErrorAddingTokens(
        (error as Error)?.message || "Ups! Could not increase tokens limit."
      );
      setIsFetching(false);
    }
  };

  const closeModalHandler = () => {
    onClose();

    setTimeout(() => {
      reset();
      setErrorAddingTokens("");
    }, 150);
  };

  return (
    <Modal
      isVisible={email.length > 0}
      isClosable={!isFetching}
      onClose={closeModalHandler}
      titleElement={
        <h3 className="text-md pointer-events-none font-medium text-slate-800">
          Tokens usage limits
        </h3>
      }
    >
      <div className="min-w-fit max-w-3xl sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
        <div className="mb-2 mr-6 text-sm text-slate-800">
          Grant tokens to user <span className="text-indigo-800">{email}</span>:
        </div>
        <form onSubmit={handleSubmit(increaseLimitHandler)}>
          <IncreaseTokensLimitOption
            option={increaseLimitOptions[0]}
            textNote="10 000 Tk (≈ 0.02 USD)"
            register={register}
            size="xs"
          />
          <IncreaseTokensLimitOption
            option={increaseLimitOptions[1]}
            textNote="100 000 Tk (≈ 0.2 USD)"
            register={register}
            size="sm"
          />
          <IncreaseTokensLimitOption
            option={increaseLimitOptions[2]}
            textNote="1 000 000 Tk (≈ 2 USD)"
            register={register}
            size="md"
          />

          {!isFetching && errorAddingTokens && (
            <div className="flex-1">
              <ErrorNotification
                message={
                  "Error increasing tokens limit, please contact your administrator if error persists"
                }
              />
            </div>
          )}

          <button
            type="submit"
            disabled={inputErrors?.planOption?.message ? true : false}
            className=" mt-2 inline-block w-full shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-12 py-2.5 text-xs font-medium text-white transition focus:outline-none  focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
          >
            <AnimatePresence mode="wait">
              {isFetching && (
                <motion.span
                  key="btn-loading"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 4 },
                  }}
                >
                  Submitting changes
                  <DotLoader />
                </motion.span>
              )}
              {!isFetching && errorAddingTokens && (
                <motion.span
                  key="btn-error"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 4 },
                  }}
                >
                  Retry
                </motion.span>
              )}
              {!isFetching && !errorAddingTokens && (
                <motion.span
                  key="btn-create"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                  Submit
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default IncreaseTokensLimitModal;
