import axios from 'axios'
const URL = `https://61275b59c2e8920017bc0c43.mockapi.io/api` //preferent, product_mobile, feature_special, new_event

export const getDataMobile = () => axios.get(`${URL}/product_mobile/`)