// TAILWIND COMPONENTS
import { Avatar } from "@material-tailwind/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ({ query }) {
  return (
    <div className="absolute flex justify-center bg-white sm:ml-48 sm:mt-16 sm:py-4 rounded text-xl w-60 sm:max-w-60">
      <ul>
        {query.map((query) => (
          <li key={query._id} className="flex flex-row gap-x-2 self-center">
            <p>
              <AccountCircleIcon />{" "}
            </p>
            <p>{query.firstname} </p>
            <p>{query.surname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
