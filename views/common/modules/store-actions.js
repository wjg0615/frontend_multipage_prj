import signals from 'signals';

/**
 * 全局事件系统
 */
const Signal = signals.Signal;
const storeActions = {
    toast: new Signal(),
    loading: new Signal(),
    overlay: new Signal(),
    pause: new Signal(), // onPause回调
    resume: new Signal(), // onResume回调
};

export default storeActions;