const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle } from '@mui/material';
//REDUX
import { useSelector, useDispatch } from 'react-redux';

// export function ComparisonModal() {
//   const { modalStatus } = useSelector(({ modalStatus }) => modalStatus);
//   console.log('modalStatus in comparison', modalStatus);


//   return (
//     <Dialog>
//       <DialogTitle>
//         COMPARING
//       </DialogTitle>
//     </Dialog>

//   );
// }