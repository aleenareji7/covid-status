import {
    RETRIEVE_COVID_STATUS_BEGIN,
    RETRIEVE_COVID_STATUS_SUCCESS,
    RETRIEVE_COVID_STATUS_FAILURE,
  } from './constants';
  import axios from 'axios';
  
  export function retrieveCovidStatus() {
    return dispatch => {
      dispatch({
        type: RETRIEVE_COVID_STATUS_BEGIN,
      });
      const promise = new Promise((resolve, reject) => {
        axios.get('https://api.rootnet.in/covid19-in/stats/latest')
        .then(res => {
          console.log(res,'response');
          dispatch({
                  type: RETRIEVE_COVID_STATUS_SUCCESS,
                  data: res.data,
                });
                resolve(res);
        })
        .catch(err => {
            console.log(err);
            dispatch({
                    type: RETRIEVE_COVID_STATUS_FAILURE,
                  });
                  reject(err);
        })
      });
      return promise;
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case RETRIEVE_COVID_STATUS_BEGIN:
        return {
          ...state,
          retrieveCovidStatusBegin: true,
          retrieveCovidStatusFailure: false,
        };
      case RETRIEVE_COVID_STATUS_SUCCESS:
        return {
          ...state,
          retrieveCovidStatusBegin: false,
          getCovidStatus: action.data.data,
        };
      case RETRIEVE_COVID_STATUS_FAILURE:
        return {
          retrieveCovidStatusBegin: false,
          retrieveCovidStatusFailure: true,
          ...state,
        };
  
      default:
        return state;
    }
  }
  