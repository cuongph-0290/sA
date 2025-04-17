import { Box, Modal as MuiModal } from "@mui/material";
import React from "react";

const Modal: React.FC<{
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #eee",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
