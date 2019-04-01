import * as authService from '../services/api'

export default {
  namespace: 'user',
  state: {
    isLogin: false,
    loading: false,
    authority: 'localAdmin'
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {

  },
  subscriptions: {

  },
}
