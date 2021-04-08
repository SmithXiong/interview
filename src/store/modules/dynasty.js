
const dynasty = {
  state: {
    listData: [
      {
        index: 1,
        dynasty: '唐',
      },
      {
        index: 2,
        dynasty: '宋',
      },
      {
        index: 3,
        dynasty: '元',
      },
      {
        index: 4,
        dynasty: '明',
      },
    ],
  },
  mutations: {
    SET_DYNASTY: (state, data) => {
      state.listData = data
    },
  },
  actions: {
  },
}

export default dynasty
