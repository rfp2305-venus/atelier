/* eslint-disable func-style */
// eslint-disable-next-line func-style
// export default function aSimpleAction() {
//   return {
//     type:'a specific type',
//     data: 'from venus'
//   };
// }

import { fetchProduct } from '../../util/api.js';
import { handleSetLoading } from '../app/actions.js';

export const COMPARISON = 'COMPARISON_PRODUCT';

export function handleFetchComparisonProduct(productId) {
  return (dispatch) => {
    fetchProduct(productId)
      .then((product) => {
        dispatch(handleSetComparisonProduct(product));
        // console.log(product);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default function handleSetComparisonProduct(comparisonDetail) {
  return {
    type: COMPARISON,
    comparisonDetail
  };
}
