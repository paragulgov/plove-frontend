import { DateTimePicker } from '@mui/lab';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../base/hooks/hooks';
import { IStringParams } from '../../../base/types/BaseTypes';
import { updateMatch } from '../../../redux/matches/matchesSlice';
import { UpdateMatchRequestPayload } from '../../../redux/matches/types';
import { modalStyles } from '../../../styles/commonStyles';

interface IUpdateMatchModalProps {
  handleClose: () => void;
  open: boolean;
}

const UpdateMatchModal: React.FC<IUpdateMatchModalProps> = ({ handleClose, open }) => {
  const params = useParams<IStringParams>();
  const dispatch = useAppDispatch();

  const [date, setDate] = React.useState<Date | null>(new Date());

  const disabled = !date;

  // Handlers
  const handleUpdateMatch = () => {
    if (date) {
      const payload: UpdateMatchRequestPayload = {
        id: +params.matchId,
        betsWillEndAt: date.toISOString(),
      };

      dispatch(updateMatch(payload));
    }
  };

  // Renders
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" mb={3}>
          Обновить время
        </Typography>

        <Box mb={3}>
          <DateTimePicker
            mask="__.__.____ __:__"
            renderInput={params => <TextField {...params} />}
            label="Прогноз можно сделать до"
            value={date}
            onChange={newValue => setDate(newValue)}
          />
        </Box>

        <Button onClick={handleUpdateMatch} variant="contained" fullWidth disabled={disabled}>
          Обновить
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateMatchModal;
