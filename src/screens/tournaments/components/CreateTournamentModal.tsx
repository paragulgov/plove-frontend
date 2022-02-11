import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';

import { useAppDispatch } from '../../../base/hooks/hooks';
import { createTournament } from '../../../redux/tournaments/tournamentsSlice';
import { CreateTournamentValues } from '../../../redux/tournaments/types';
import { modalStyles } from '../../../styles/commonStyles';

interface ICreateTournamentModalProps {
  handleClose: () => void;
  open: boolean;
}

const CreateTournamentModal: React.FC<ICreateTournamentModalProps> = ({ handleClose, open }) => {
  const dispatch = useAppDispatch();

  const [values, setValues] = React.useState<CreateTournamentValues>({ name: '' });

  // Handlers
  const handleChangeName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleCreateTournament = () => {
    dispatch(createTournament(values));
  };

  // Renders
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" mb={2}>
          Создать турнир
        </Typography>

        <TextField
          name="name"
          value={values.name}
          onChange={handleChangeName}
          label="Название турнира"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button onClick={handleCreateTournament} variant="contained" fullWidth disabled={!values.name.trim()}>
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateTournamentModal;
