import {reactive} from 'vue'

export const store = reactive({
  fullData : [],
  search : {
    path:{
      api_link: 'https://api.themoviedb.org/3/search',
      type: 'movie',
    },
    queries : {
      api_key: '895c7419487c2b8fefb9288314118624',
      query: '',
      language: 'it-IT',
    }
  }
});