import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { IStringParams } from '../../../base/types/BaseTypes';
import { fetchTournamentTable } from '../../../redux/tournaments/tournamentsSlice';

const TableSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<IStringParams>();

  const table = useAppSelector(state => state.tournaments.table);

  const columns: GridColDef[] = [
    { field: 'user_fullName', headerName: 'Имя', flex: 10 },
    { field: 'statistic_points', headerName: 'О', flex: 1 },
    { field: 'statistic_matchOutcome', headerName: 'ИМ', flex: 1 },
    { field: 'statistic_goalDifference', headerName: 'РМ', flex: 1 },
    { field: 'statistic_accurateScore', headerName: 'ТС', flex: 1 },
  ];

  // Effects
  useEffect(() => {
    dispatch(fetchTournamentTable(+params.tournamentId));
  }, [params.tournamentId]);

  // Renders
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={table}
        getRowId={row => row.statistic_id}
        columns={columns}
        sx={{ background: '#fff' }}
      />
    </div>
  );
};

export default TableSection;
