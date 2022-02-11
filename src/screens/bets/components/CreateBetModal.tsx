import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

interface ICreateBetModalProps {
  handleClose: () => void;
  open: boolean;
}

const CreateBetModal: React.FC<ICreateBetModalProps> = props => {
  const { handleClose, open } = props;

  const [homeGoals, setHomeGoals] = useState<string>('');

  const handleChangeHomeGoals = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHomeGoals(event.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Сделать прогноз
        </Typography>
        <Typography sx={{ mb: 3 }}>Ливерпуль - Челси</Typography>

        <TextField
          value={homeGoals}
          onChange={handleChangeHomeGoals}
          label="Голы домашней команды"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          value={homeGoals}
          onChange={handleChangeHomeGoals}
          label="Голы выездной команды"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" disabled={!/^\d+$/i.test(homeGoals)} fullWidth>
          Отправить
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default CreateBetModal;
