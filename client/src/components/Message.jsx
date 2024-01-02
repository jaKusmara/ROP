import { useAuthContext } from "../hooks/useContext/useAuthContext";

export default function Message({ message }) {
  const { user } = useAuthContext();
  return (
    <>
      <div
        className={
          message.sender_id === user.user._id
            ? "relative bg-blue-300 px-3 py-1 w-fit max-w-[60%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] rounded-md text-gray-900 whitespace-wrap break-all mt-2 self-end"
            : "relative bg-gray-300 px-3 py-1 w-fit max-w-[60%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] rounded-md text-gray-900 whitespace-wrap break-all mt-2"
        }
      >
        <div>{message.content}</div>
      </div>
      <div
        className={
          message.sender_id === user.user._id
            ? "relative max-w-[60%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] rounded-md text-gray-900 whitespace-wrap break-all self-end"
            : "relative max-w-[60%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] rounded-md text-gray-900 whitespace-wrap break-all"
        }
      >
      </div>
    </>
  );
}
