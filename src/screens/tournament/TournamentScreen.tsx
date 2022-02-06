import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamsType {
  id: string;
}

const TournamentScreen: React.FC = () => {
  let { id } = useParams<ParamsType>();
  // const dispatch = useAppDispatch();
  // const tournament = useAppSelector(selectCurrentTournament);

  // useEffect(() => {
  //   dispatch(fetchTournament(id));
  // }, []);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      Tournament {id}
    </Container>
  );
};

export default TournamentScreen;
