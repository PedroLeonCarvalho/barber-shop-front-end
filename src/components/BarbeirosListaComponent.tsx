import { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import http from "../http";
import IBarbeiro from "../interfaces/IBarbeiro";

const BarbeirosListaComponent = () => {
  const [barbeiros, setBarbeiros] = useState<IBarbeiro[]>([]);

  // Simulando chamada ao back-end
  useEffect(() => {
    http
      .get<IBarbeiro[]>("http://localhost:8080/user/barbers") // Substitua pela URL real do seu back-end
      .then((response) => {
        setBarbeiros(response.data);
      })
      .catch((error) => console.error("Erro ao buscar barbeiros:", error));
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      {barbeiros.map((barbeiro) => (
        <Stack key={barbeiro.id} alignItems="center" paddingTop={2}>
          <Avatar
            key={barbeiro.id}
            src={barbeiro.profile_picture}
            alt={barbeiro.name}
            sx={{ width: 56, height: 56 }}
          >
            {barbeiro.name.charAt(0)}
          </Avatar>
          <Typography variant="caption">{barbeiro.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default BarbeirosListaComponent;
