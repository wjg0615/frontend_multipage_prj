import axios from 'axios';
import MD5 from 'md5.js';
import storeActions from './store-actions';
import { serverHost } from '../../../app/cfg/const';

let requestData = function(config) {
    let peter = (config.data ? JSON.stringify(config.data) : '') + 'D82A746ABE3348AA6C247B8B3C3146BD' + window.phead.platform;
    let md5stream = new MD5()
    md5stream.end(peter)
    console.log('peter: ', peter);
    let signature = md5stream.read().toString('hex')
    console.log('signature: ', signature);
    axios({
        method: 'post',
        url: `https://${serverHost}${config.url}`,
        data: config.data,
        headers: {...window.phead, access_token: 'eNsQIpcoCJaZ5EULA7Bw', signature: signature },
    }).then(response => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        return response.data;
    }).then(data => {
        config.loading && storeActions.loading.dispatch(false);
        if (data && data.code == 100) {
            config.success ? config.success(data) : storeActions.toast.dispatch(data.desc);
        } else {
            config.fail ? config.fail(data) : storeActions.toast.dispatch(data.desc);
        }
    }).catch(e => {
        config.loading && storeActions.loading.dispatch(false);
        config.error ? config.error(e) : storeActions.toast.dispatch(e.message);
    });
}
export default requestData;