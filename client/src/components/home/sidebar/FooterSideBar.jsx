import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useLogin } from "../../../hooks/useLogin";

export default function FooterSideBar() {
  const { user } = useAuthContext();
  const { isLoading } = useLogin();

  return (
    <>
      {isLoading ? (
        <div className="max-h-16 md:h-12"></div>
      ) : (
        <img
          src={user.user.avatar}
          alt={user.user.username}
          className="max-h-16 md:h-12"
        />
      )}

      <p className="self-center ml-4">
        {user.user.firstname} {user.user.surname}
      </p>
    </>
  );
}
