import {reactive} from 'vue'

export const store = reactive({
  categories: ['movie','tv'],
  movieGenres: [],
  tvGenres: [],
  data: {
    movieData : [],
    movieCredits : [],
    tvData : [],
    tvCredits : [],
  },
  api_config: {},
  axiosGetObject: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params : {
      api_key: '895c7419487c2b8fefb9288314118624',
      language: 'it-IT',
    },
  },

  query: '',
  last_query: '',
  movieSelected: '',
  tvSelected: '',
  mainSelected: '',
});