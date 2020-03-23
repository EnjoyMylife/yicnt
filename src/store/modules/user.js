const user = {
  state: {

  },
  mutations: {

  },
  actions: {
    Login ({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      console.log(username)
      commit()
    }
  }
}

export default user
