/* eslint-disable func-style */
// eslint-disable-next-line func-style
// export default function aSimpleAction() {
//   return {
//     type:'a specific type',
//     data: 'from venus'
//   };
// }



export const COMPARISON = 'COMPARISON PRODUCT';

export default function handleSetComparisonProduct(product) {
  return {
    type: COMPARISON,
    comparisonDetail: product
  };
}

// export function closeModal() {
//   return {
//     type: COMPARISON,
//     modalStatus: false
//   };
// }