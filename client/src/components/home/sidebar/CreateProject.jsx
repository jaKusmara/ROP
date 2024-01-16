import { useState, useEffect } from "react";
import { useProject } from "../../../hooks/useProject";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";

export default function CreateProject({ open, onClose }) {
  const { createProject } = useProject();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");

  const handleOnSubmit = () => {
    createProject(user, title);
  };
  
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalDialog>
          <DialogTitle>Create new project</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onClose();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <Button type="submit" onClick={handleOnSubmit}>
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
