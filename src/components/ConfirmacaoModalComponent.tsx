import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmacaoModalComponentProps {
  open: boolean;
  onClose: () => void;
  barberId: number;
  appointmentDate: string;
  timeSlot: string | null;
}

const ConfirmacaoModalComponent: React.FC<ConfirmacaoModalComponentProps> = ({
  open,
  onClose,
  barberId,
  appointmentDate,
  timeSlot,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6">Confirmar Agendamento</Typography>
        <Typography>Barbeiro ID: {barberId}</Typography>
        <Typography>Data: {appointmentDate}</Typography>
        <Typography>Horário: {timeSlot}</Typography>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button variant="contained" color="primary">
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmacaoModalComponent;
