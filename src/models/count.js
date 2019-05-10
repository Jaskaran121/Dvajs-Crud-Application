export default {
  namespace: "count",
  state: {
    count: 0
  },
  reducers: {
    add(state, { payload }) {
      return { ...state, count: payload + 2 };
    }
  },
  effects: {},
  subscriptions: {}
};
