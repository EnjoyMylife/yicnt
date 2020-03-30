/* eslint-disable eqeqeq */
import { homeTabData } from '@/constants/homeTabData'
const localStorageSidebar = localStorage.getItem('sidebar')
const sidebarOpend = Boolean(Number(typeof localStorageSidebar == 'object' ? 1 : localStorageSidebar))
const app = {
  state: {
    sidebar: {
      data: {},
      openList: [],
      opend: sidebarOpend
    },
    tabs: {
      data: [], // tabs数据
      active: '', // 当前选择tab
      next: {} // 下一个tab
    }
  },
  mutations: {
    // navbar切换时更新sidbar
    TOGGLE_SIDBAR_DATA: (state, data) => {
      state.sidebar.data = data
      let temp = []
      for (var k in data) {
        temp.push(data[k].id)
      }
      state.sidebar.openList = temp
    },
    // 侧边栏是否收缩
    TOGGLE_SIDBAR: state => {
      if (state.sidebar.opend) {
        localStorage.setItem('sidebar', 0)
      } else {
        localStorage.setItem('sidebar', 1)
      }
      state.sidebar.opend = !state.sidebar.opend
    },
    // 添加 tab
    ADD_TAB_DATA: (state, data) => {
      state.tabs.active = data.id
      for (var k in state.tabs.data) {
        if (state.tabs.data[k].id === data.id) return
      }
      state.tabs.data.push(data)
    },
    // 更改 tab 页签选择
    TOGGLE_TAB_ACTIVE: (state, data) => {
      state.tabs.active = data
    },
    // 删除 tab
    DEL_TAB_DATA: (state, data) => {
      for (var k in state.tabs.data) {
        if (state.tabs.data[k].id == data.id) {
          state.tabs.next = {}
          if (state.tabs.data[k + 1]) {
            state.tabs.next = state.tabs.data[k + 1]
          } else if (state.tabs.data[k - 1]) {
            state.tabs.next = state.tabs.data[k - 1]
          }
          state.tabs.data.splice(k, 1)
        }
      }
    },
    // 删除其他 tab
    DEL_TAB_OTHER: (state, data) => {
      state.tabs.data = []
      if (data.id !== homeTabData.id) {
        state.tabs.data.push(homeTabData)
      }
      state.tabs.data.push(data)
      state.tabs.next = data
    },
    // 删除所有 tab
    DELTABALL: state => {
      state.tabs.data = [homeTabData]
    }
  },
  actions: {
    // navbar切换时更新sidbar
    ToggleSideBarData: ({ commit }, data) => {
      commit('TOGGLE_SIDBAR_DATA', data)
    },
    // 侧边栏是否收缩
    ToggleSideBar: ({ commit, state }) => {
      commit('TOGGLE_SIDBAR')
      commit('TOGGLE_SIDBAR_DATA', state.sidebar.data)
    },
    // 添加 tab
    AddTabData: ({ commit }, data) => {
      commit('ADD_TAB_DATA', data)
    },
    // 更改 tab 页签选择
    ToggleTabActive: ({ commit }, data) => {
      commit('TOGGLE_TAB_ACTIVE', data)
    },
    // 删除 tab
    DelTabData: ({ commit, state }, data) => {
      return new Promise(resolve => {
        commit('DEL_TAB_DATA', data)
        resolve(state.tabs.next)
      })
    },
    // 删除其他 tab
    DelTabOther: ({ commit, state }, data) => {
      return new Promise(resolve => {
        commit('DEL_TAB_OTHER', data)
        resolve([state.tabs.next, state.tabs.data])
      })
    },
    // 删除所有 tab
    DelTabAll: ({ commit }) => {
      return commit('DELTABALL')
    }
  }
}
export default app
