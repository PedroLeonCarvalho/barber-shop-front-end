import React, { useEffect, useState } from "react";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { IServicos } from "../interfaces/IServicos";
import { Box, Button, Modal, Typography } from "@mui/material";
import { IBarbeiro } from "../interfaces/IBarbeiro";
import http from "../http";
import BarbeirosListaComponent from "./BarbeirosListaComponent";
import { ptBR } from "date-fns/locale";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TimeSlotsComponent from "./TimeSlotsComponent";
import { ITimeSlots } from "../interfaces/ITimeSlots";

interface CalendarProps {
  openCalendar: boolean;
  onClose: () => void;
  servicoSelecionado: IServicos;
}

const CalendarComponent: React.FC<CalendarProps> = ({
  openCalendar,
  onClose,
  servicoSelecionado,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [barbeiros, setBarbeiros] = useState<IBarbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<ITimeSlots[]>([]);

  function handleBarbeiroSelecionado(barbeiro: number) {
    setSelectedBarbeiro(barbeiro);
    console.log("Atualizando selectedBarbeiro para:", barbeiro);
  }

  useEffect(() => {
    if (selectedBarbeiro && selectedDate) {
      setLoading(false);
      setError(null); // Resetando erro antes da requisição
      setTimeSlots([]); // Resetando timeSlots para evitar exibição de dados antigos
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD"); // Garante a formatação correta
      // Quando barbeiro ou selectedDate mudam, faça a requisição à API
      http
        .get(
          `/info/timeslots?date=${formattedDate}&barberId=${selectedBarbeiro}`
        )
        .then((response) => {
          // Lógica para lidar com os dados da API
          setTimeSlots(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
          setError("Data indisponível. Selecione outra data.");
        });
    }
  }, [selectedBarbeiro, selectedDate]);

  useEffect(() => {
    if (openCalendar) {
      carregarBarbeiros();
    }
  }, []);

  function carregarBarbeiros() {
    http
      .get("/info/services")
      .then((response) => {
        setBarbeiros(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar barbeiros:", error);
        setError("Falha ao carregar barbeiros.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: "80vh", // Limita a altura máxima para 80% da altura da viewport
    overflowY: "auto", // Adiciona rolagem vertical caso o conteúdo ultrapasse a altura máxima
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  dayjs.locale("pt-br");

  return (
    <div>
      <Button onClick={onClose}>Fecha</Button>
      <Modal
        open={openCalendar}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate: any) => {
                const parsedDate = dayjs(newDate);
                if (parsedDate.isValid()) {
                  setSelectedDate(parsedDate);
                }
              }}
            />
            <Box> Escolha o barbeiro :</Box>
            <Box>
              <BarbeirosListaComponent
                onSelectBarbeiro={handleBarbeiroSelecionado}
              />
            </Box>
          </LocalizationProvider>
          {/* Renderiza a mensagem de erro, se houver */}
          {error ? (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          ) : (
            <Box>
              {timeSlots.length > 0 ? (
                <TimeSlotsComponent
                  timeSlots={timeSlots}
                  servicoSelecionado={servicoSelecionado}
                  appointmentDate={selectedDate.format("YYYY-MM-DD")}
                  barberId={selectedBarbeiro ?? 0}
                />
              ) : loading ? (
                <Typography variant="body1">
                  Nenhum horário disponível.
                </Typography>
              ) : null}
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
