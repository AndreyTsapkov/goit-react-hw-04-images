import axios from 'axios';


const API_KEY = '27784898-08f565a22f2602ecd9f874e94';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
	key: API_KEY,
  orientation: 'horizontal',
	image_type: 'photo',
  per_page: 12,
};

export const fetchImages = async (query, page) => {
	const {data} = await axios.get(`?q=${query}&page=${page}`);
  return data;
};
