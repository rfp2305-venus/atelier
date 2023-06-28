/* eslint-disable func-style */
// eslint-disable-next-line func-style
// export default function aSimpleAction() {
//   return {
//     type:'a specific type',
//     data: 'from venus'
//   };
// }

export const COMPARISON = 'COMPARISON MODAL';

export function openModal() {
  return {
    type: COMPARISON,
    modalstatus: true
  };
}

export default function closeModal() {
  return {
    type: COMPARISON,
    modalstatus: false
  };
}