import apiInstance from '../services';
import ApiConstants from '../services/ApiConstants';

export  const home = async (info) => {
    console.log('00000000000000000000000000', info);
    try {
        return Promise.resolve(await apiInstance.get(ApiConstants.HOME, info));
    } catch (error) {
        return Promise.reject(error);
    }
};

export const home2 = async (info) => {
    console.log('00000000000000000000000000', info);
    try {
        return Promise.resolve(await apiInstance.get(ApiConstants.HOME, info));
    } catch (error) {
        return Promise.reject(error);
    }
};