import axios from 'axios';

const buildClient = ({ req }) => {

  if (typeof window === 'undefined') {
    // we are on the server
    const instance = axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: {
        ...req.headers,
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    instance.defaults.headers.get['content-type'] = 'application/json';
    return instance;
  } else {
    //  we must be on the browser
    return axios.create({
      baseURL: '/'
    })
  }

};

export default buildClient;