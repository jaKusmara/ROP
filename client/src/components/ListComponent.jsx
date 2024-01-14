import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import TaskCard from "./project/TaskCard";
import { useIdContext } from "../hooks/useContext/useIdContext";



import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';

export default function ListComponent({ list, tasks }) {
  const { dispatch } = useIdContext();
  const { setBackground, setCreateTask } = useToggleFormContext();

  const handleCreateTask = () => {
    setBackground(true);
    setCreateTask(true);
    dispatch({ type: "SET_LIST_ID", payload: list._id });
  };

  return (
    <div className="border px-2 mx-2 rounded-md bg-gray-800 h-fit w-80 whitespace-wrap break-all self-start">
      <nav className="flex flex-row">
        <button onClick={handleCreateTask}>
          <AddIcon />
        </button>
        <h2 className="w-full text-center">{list.title}</h2>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu placement="bottom-end">
            <MenuItem>
              <ListItemDecorator>
                <Edit />
              </ListItemDecorator>{" "}
              Edit post
            </MenuItem>
            <MenuItem disabled>
              <ListItemDecorator />
              Draft post
            </MenuItem>
            <ListDivider />
            <MenuItem variant="soft" color="danger">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <DeleteForever />
              </ListItemDecorator>{" "}
              Delete
            </MenuItem>
          </Menu>
        </Dropdown>
      </nav>
      <div className="whitespace-wrap break-all max-h-96">
        {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
      </div>
    </div>
  );
}
