/* eslint-disable func-style */
// eslint-disable-next-line func-style
// export default function aSimpleAction() {
//   return {
//     type:'a specific type',
//     data: 'from venus'
//   };
// }

export const COMPARISON = 'COMPARISON MODAL';

export default function handleModal(value) {
  return {
    type: COMPARISON,
    modalStatus: value
  };
}

// export function closeModal() {
//   return {
//     type: COMPARISON,
//     modalStatus: false
//   };
// }