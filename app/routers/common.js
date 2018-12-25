import express from 'express';
import RequestCombine from '../controllers/request/base/request_combine';
import {
    REQUEST_TYPE
} from '../cfg/const';

// eslint-disable-next-line new-cap
const router = express.Router();

//监听接收get请求
router.get('/', function(req, res) {
    new RequestCombine(req, res, REQUEST_TYPE.GET);
});

//监听接收post请求
router.post('/', function(req, res) {
    // eslint-disable-next-line no-new
    new RequestCombine(req, res, REQUEST_TYPE.POST);
});

export default router;