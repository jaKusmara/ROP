import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";

export default function JoinProject({ open, onClose }) {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalDialog>
          <DialogTitle>Join project</DialogTitle>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onClose();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Connection String</FormLabel>
                <Input autoFocus required />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
