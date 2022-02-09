import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import React from 'react';

const MatchBetsList = () => {
  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Все прогнозы на матч
            </ListSubheader>
          }
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>ТЕ</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Тетяна Енот"
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    Прогноз: 2 - 0
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    Очков получено: 3
                  </Typography>
                </>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>ТЕ</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Тетяна Енот"
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    Прогноз: 2 - 0
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    Очков получено: 3
                  </Typography>
                </>
              }
            />
          </ListItem>
        </List>
      </Paper>
      <Button variant="outlined" fullWidth>
        Загрузить еще
      </Button>
    </>
  );
};

export default MatchBetsList;
