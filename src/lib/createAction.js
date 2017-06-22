const createAction = (type, promise, ...args) => (dispatch) => {

  dispatch({
    type: `${type}_PENDING`,
    ...(args[2] || {}),
  });
  promise.then((response) => {

    dispatch({
      type: `${type}_SUCCESS`,
      payload: response.data,
      ...(args[0] || {}),
    });

  }).catch((error) => {

    dispatch({
      type: `${type}_FAILURE`,
      msg: error.msg,
      error,
      ...(args[1] || {}),
    });

  });

};

export default createAction;
