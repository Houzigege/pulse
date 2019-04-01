import * as authService from '../services/api'

export default {
  namespace: 'app',
  state: {
    loading: false,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *a({ payload }, { call, put }) {
      console.log(payload);
      yield put({type: 'updateState', payload: {loading: true} });
      const login = yield call(authService.a, payload);
      console.log(login);
      yield put({type: 'updateState', payload: {loading: false} });
    },
  },
  subscriptions: {

  },
}
