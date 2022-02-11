import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

import { useAppDispatch } from '../../../base/hooks/hooks';
import { setModalOpen } from '../../../redux/user/userSlice';

interface IMatchCardProps {}

const MatchHeader: React.FC<IMatchCardProps> = () => {
  const dispatch = useAppDispatch();

  const handleOpenCreateBetModal = () => {
    dispatch(setModalOpen({ modal: 'createBet', value: true }));
  };

  const handleOpenCalculateBetsModal = () => {
    dispatch(setModalOpen({ modal: 'calculateBets', value: true }));
  };

  const handleOpenUpdateMatchModal = () => {
    dispatch(setModalOpen({ modal: 'updateMatch', value: true }));
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3, wordBreak: 'break-all' }}>
      <Box>
        <Typography variant="h3">АПЛ</Typography>
        <Typography variant="h6">Ливерпуль - Челси</Typography>
        <Typography variant="body1">
          Всего сделано прогнозов: <b>23</b>
        </Typography>
        <Typography variant="body1" mb={2}>
          Прогноз можно сделать до: <b>31 февраля 2022, 23:00</b>
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Button onClick={handleOpenCreateBetModal} variant="contained">
            Сделать прогноз
          </Button>
          <Button onClick={handleOpenUpdateMatchModal} variant="contained">
            Обновить время
          </Button>
          <Button onClick={handleOpenCalculateBetsModal} variant="contained">
            Завершить матч
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MatchHeader;
