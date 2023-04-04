import {reactive} from 'vue'

export const store = reactive({
  categories: ['movie','tv'],
  data: {
    movieData : [],
    movieCredits : [],
    tvData : [],
    tvCredits : [],
  },
  api_url: 'https://api.themoviedb.org/3',
  api_config: {},
  api_token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTVjNzQxOTQ4N2MyYjhmZWZiOTI4ODMxNDExODYyNCIsInN1YiI6IjY0MjZhYzNlYzA0NDI5MDI2YjEyYTU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SIwOhoV_DieKbKTS4ENkqqcaaQkrd8oOpOPEoBNx03w',
  params : {
    api_key: '895c7419487c2b8fefb9288314118624',
    query: '',
    language: 'it-IT',
  },
  last_query: '',
});