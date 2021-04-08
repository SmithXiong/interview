const Mock = require('mockjs')
const template = {
  'author': '@cname(2-10)',
  'content': '@csentence(2, 20)',
  'dynasty|1': ['唐', '宋', '元', '明'],
}

const list = () => {
  let array = []
  for (let i = 0, len = 100; i < len; i++) {
    array.push({
      index: i + 1,
      ...Mock.mock(template),
    })
  }
  return array
}
const poem = {
  state: {
    listData: list(),
  },
  mutations: {
    SET_POEM: (state, data) => {
      state.listData = data
    },
  },
  actions: {
  },
}

export default poem
