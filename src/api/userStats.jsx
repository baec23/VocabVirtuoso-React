import axios from 'axios';
import serverUrl from "../Constants";
export default axios.create({
    baseURL: serverUrl()
});