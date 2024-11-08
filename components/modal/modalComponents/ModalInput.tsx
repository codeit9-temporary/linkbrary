import { bindCls } from "@/lib/utils";

const ModalInput = ({
  placeholder,
  name,
}: {
  placeholder: string;
  name: string;
}) => {
  return (
    <input
      type="text"
      name={name}
      id={name}
      className={bindCls(
        "w-full rounded-lg border border-gray300 py-[18px] px-[15px] mb-6 text-black300",
        "placeholder:text-base placeholder:text-gray400",
        "focus:outline-1px focus:outline-purple100"
      )}
      placeholder={placeholder}
    ></input>
  );
};

export default ModalInput;
