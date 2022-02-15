import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { IStringParams } from '../../../base/types/BaseTypes';
import { updateBet } from '../../../redux/bets/betsSlice';
import { CreateBetDto, CreateBetValues } from '../../../redux/bets/types';
import { modalStyles } from '../../../styles/commonStyles';

interface ICreateBetModalProps {
  handleClose: () => void;
  open: boolean;
}

const UpdateBetModal: React.FC<ICreateBetModalProps> = ({ handleClose, open }) => {
  const params = useParams<IStringParams>();
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<CreateBetValues>({ homeTeamGoalsBet: '', awayTeamGoalsBet: '' });
  const disabled = !/^\d+$/i.test(values.homeTeamGoalsBet) || !/^\d+$/i.test(values.awayTeamGoalsBet);

  const match = useAppSelector(state => state.matches.currentMatch);

  // Handlers
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleUpdateBet = () => {
    const payload: CreateBetDto = {
      homeTeamGoalsBet: +values.homeTeamGoalsBet,
      awayTeamGoalsBet: +values.awayTeamGoalsBet,
      matchId: +params.matchId,
    };

    dispatch(updateBet(payload));

    setValues({ awayTeamGoalsBet: '', homeTeamGoalsBet: '' });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Обновить прогноз
        </Typography>
        <Typography sx={{ mb: 3 }}>
          {match?.homeTeam} - {match?.awayTeam}
        </Typography>

        <TextField
          value={values.homeTeamGoalsBet}
          onChange={handleChangeValues}
          name="homeTeamGoalsBet"
          label="Голы домашней команды"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          value={values.awayTeamGoalsBet}
          onChange={handleChangeValues}
          name="awayTeamGoalsBet"
          label="Голы выездной команды"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button onClick={handleUpdateBet} variant="contained" disabled={disabled} fullWidth>
          Обновить
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateBetModal;
