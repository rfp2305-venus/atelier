import React from 'react';
import { TextField } from '@mui/material';

export default function Search({ search, setSearch }) {

  return (
    <form>
      <TextField
        sx={{ width: 350 }}
        placeholder="Have a question? Search for answers..."
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
      />
    </form>
  );
}