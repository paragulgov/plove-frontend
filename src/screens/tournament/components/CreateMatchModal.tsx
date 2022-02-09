import { DateTimePicker } from '@mui/lab';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useEffect } from 'react';

interface ICreateBetModalProps {
  handleClose: () => void;
  open: boolean;
}

const CreateMatchModal: React.FC<ICreateBetModalProps> = props => {
  const { handleClose, open } = props;
  const [value, setValue] = React.useState<Date | null>(new Date());

  useEffect(() => {
    // new Date("Wed Feb 09 2022 17:52:19 GMT+0300 (Москва, стандартное время)").toISOString() => 2022-02-09T14:52:19.000Z
    // new Date("2022-02-09T14:52:19.000Z") => Wed Feb 09 2022 17:52:19 GMT+0300 (Москва, стандартное время)
    console.log(
      format(new Date('Wed Feb 09 2022 17:57:30 GMT+0300 (Москва, стандартное время)'), 'dd MMMM yyyy hh:mm', {
        locale: ru,
      }),
    );
  }, [value]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Создать матч
        </Typography>

        <DateTimePicker
          mask="__.__.____ __:__"
          renderInput={params => <TextField {...params} />}
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
        />
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

export default CreateMatchModal;
