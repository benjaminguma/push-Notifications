import axios from 'axios';

async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js';
    const reg = await navigator.serviceWorker.register (url, {scope: '/'});

    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}

async function subscribe (serviceWorkerReg) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription ();

  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe ({
      userVisibleOnly: true,
      applicationServerKey: 'BKemtwM7irZVq7QiMjpIvx_pioe-DDN-T2mdceu_bE57MjttTD_BPmHROZYrnUfyNaQsOJ28oub9l_-UW8yqBDo',
    });
    axios.post ('/subscribe', subscription);
  }
}

export {regSw, subscribe};
