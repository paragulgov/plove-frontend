import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { IStringParams } from '../../../base/types/BaseTypes';
import { calculateMatch } from '../../../redux/matches/matchesSlice';
import { CalculateMatchDto, CalculateMatchValues } from '../../../redux/matches/types';
import { modalStyles } from '../../../styles/commonStyles';

interface ICalculateBetsModalProps {
  handleClose: () => void;
  open: boolean;
}

const CalculateBetsModal: React.FC<ICalculateBetsModalProps> = ({ handleClose, open }) => {
  const dispatch = useAppDispatch();
  const params = useParams<IStringParams>();

  const [values, setValues] = useState<CalculateMatchValues>({ homeTeamGoals: '', awayTeamGoals: '' });
  const disabled = !/^\d+$/i.test(values.homeTeamGoals) || !/^\d+$/i.test(values.awayTeamGoals);

  const match = useAppSelector(state => state.matches.currentMatch);

  //Handlers
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleCalculateBets = () => {
    const payload: CalculateMatchDto = {
      id: +params.matchId,
      homeTeamGoals: +values.homeTeamGoals,
      awayTeamGoals: +values.awayTeamGoals,
    };
    dispatch(calculateMatch(payload));
  };

  // Renders
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Завершить матч
        </Typography>
        <Typography sx={{ mb: 3 }}>
          {match?.homeTeam} - {match?.awayTeam}
        </Typography>

        <TextField
          value={values.homeTeamGoals}
          onChange={handleChangeValues}
          name="homeTeamGoals"
          label="Голы домашней команды"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          value={values.awayTeamGoals}
          onChange={handleChangeValues}
          name="awayTeamGoals"
          label="Голы выездной команды"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button onClick={handleCalculateBets} color="secondary" variant="contained" disabled={disabled} fullWidth>
          Завершить
        </Button>
      </Box>
    </Modal>
  );
};

export default CalculateBetsModal;
