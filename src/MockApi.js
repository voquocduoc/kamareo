import find from 'lodash/find';
import axios from 'axios';
import storesMockData from './data/stores';
export const stores = storesMockData;

export default {
    getStore(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const store = find(stores, {id: id});
                resolve(store);
            }, 0)
        });
    },
    getRedInvoice(id) {
      return new Promise((resolve) => {
          setTimeout(() => {
              const redInvoice = find(redInvoices, {id: id});
              resolve(redInvoice);
          }, 0)
      });
    }
}
