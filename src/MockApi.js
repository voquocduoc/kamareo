import storesMockData from './data/stores';
export const stores = storesMockData;
import {getStore, getRedInvoice} from "./firebase/db";

export default {
    getStore(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                getStore(id).then((result) => {
                    if (result) {
                        var resultObject = result;
                        resultObject.id = id;
                        var redInvoiceID = result.redInvoice;
                        if (redInvoiceID) {
                            getRedInvoice(redInvoiceID).then((result) => {
                                resultObject.redInvoice = result;
                                resultObject.redInvoiceId= redInvoiceID;
                                resolve(resultObject);
                            })
                        }
                    }
                });
               
            }, 0)
        });
    }
}
