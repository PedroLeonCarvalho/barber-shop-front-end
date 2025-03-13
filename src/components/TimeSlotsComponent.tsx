/* eslint-disable react/jsx-no-undef */
import * as React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { ITimeSlots } from "../interfaces/ITimeSlots";
import { useState } from "react";
import ConfirmacaoModalComponent from "./ConfirmacaoModalComponent";
import { IServicos } from "../interfaces/IServicos";

interface TimeSlotsComponentProps {
  timeSlots: ITimeSlots[];
  barberId: number;
  appointmentDate: string;
  servicoSelecionado: IServicos;
}

const TimeSlotsComponent: React.FC<TimeSlotsComponentProps> = ({
  timeSlots,
  barberId,
  appointmentDate,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleClick = (slot: ITimeSlots) => {
    setSelectedTimeSlot(slot.availableTime);
    setOpenModal(true);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} columns={16}>
        {timeSlots.map((slot, index) => (
          <Grid>
            <Box
              onClick={() => handleClick(slot)}
              sx={{
                border: "1px solid gray",
                padding: 2,
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6">{slot.availableTime}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {openModal && (
        <ConfirmacaoModalComponent
          open={openModal}
          onClose={() => setOpenModal(false)}
          barberId={barberId}
          appointmentDate={appointmentDate}
          timeSlot={selectedTimeSlot}
        />
      )}
    </Box>
  );
};

export default TimeSlotsComponent;
