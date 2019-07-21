import axios from 'axios';

export default axios.create({
    baseURL: `https://agile-refuge-69227.herokuapp.com/`
    //baseURL: `http://192.168.0.16:3000`
});