import { DateTimePicker } from '@mui/lab';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../base/hooks/hooks';
import { IStringParams } from '../../../base/types/BaseTypes';
import { createMatch } from '../../../redux/matches/matchesSlice';
import { CreateMatchDto, CreateMatchValues } from '../../../redux/matches/types';
import { modalStyles } from '../../../styles/commonStyles';

interface ICreateMatchModalProps {
  handleClose: () => void;
  open: boolean;
}

const CreateMatchModal: React.FC<ICreateMatchModalProps> = ({ handleClose, open }) => {
  const params = useParams<IStringParams>();
  const dispatch = useAppDispatch();

  const [values, setValues] = React.useState<CreateMatchValues>({ homeTeam: '', awayTeam: '' });
  const [date, setDate] = React.useState<Date | null>(new Date());

  const disabled = !values.homeTeam.trim() || !values.awayTeam.trim() || !date;

  // Handlers
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleCreateMatch = () => {
    if (date) {
      const payload: CreateMatchDto = {
        ...values,
        betsWillEndAt: date.toISOString(),
        tournamentId: +params.tournamentId,
      };

      dispatch(createMatch(payload));
    }
  };

  // Renders
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" mb={3}>
          Создать матч
        </Typography>

        <TextField
          name="homeTeam"
          value={values.homeTeam}
          onChange={handleChangeValues}
          label="Домашняя команда"
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          name="awayTeam"
          value={values.awayTeam}
          onChange={handleChangeValues}
          label="Выездная команда"
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box mb={3}>
          <DateTimePicker
            mask="__.__.____ __:__"
            renderInput={params => <TextField {...params} />}
            label="Прогноз можно сделать до"
            value={date}
            onChange={newValue => setDate(newValue)}
          />
        </Box>

        <Button onClick={handleCreateMatch} variant="contained" fullWidth disabled={disabled}>
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateMatchModal;
