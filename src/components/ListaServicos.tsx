import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import http from "../http";
import { IServicos } from "../interfaces/IServicos";
import CalendarComponent from "./CalendarComponent";

const ListaServicos = () => {
  const [servicos, setServicos] = useState<IServicos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [servicoSelecionado, setServicoSelecionado] =
    useState<IServicos | null>(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    http
      .get("/info/services")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
        setError("Falha ao carregar serviços.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const abrirCalendario = (servico: IServicos) => {
    setServicoSelecionado(servico);
    setMostrarCalendario(true);
  };

  return (
    <Box component="section" sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Nossos Serviços
      </Typography>

      <List sx={{ width: "100%" }}>
        {servicos.map((servico, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              py: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Typography variant="body1" fontWeight="bold">
                {servico.name}
              </Typography>
              <Typography variant="body1" color="bold">
                Duração {servico.durationMinutes} min
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Valor {servico.price} R$
              </Typography>
            </Stack>
            <Button
              onClick={() => abrirCalendario(servico)}
              variant="contained"
            >
              Agendar
            </Button>
          </ListItem>
        ))}
      </List>
      {mostrarCalendario && (
        <CalendarComponent
          openCalendar={mostrarCalendario}
          onClose={() => setMostrarCalendario(false)}
        />
      )}
    </Box>
  );
};

export default ListaServicos;
