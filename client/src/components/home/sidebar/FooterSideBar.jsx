import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

export default function FooterSideBar() {
  const { user } = useAuthContext();

  return (
    <>
      <img
        src={user.user.avatar}
        alt={user.user.username}
        className="max-h-16"
      />

      <p className="self-center ml-4">
        {user.user.firstname} {user.user.surname}
      </p>
    </>
  );
}
