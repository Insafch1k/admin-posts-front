const BASE_URL = 'https://your-api-domain.com/api';

export const API = {
  GET_ALL: `${BASE_URL}/channels`,

  GET_CHANNEL_STYLE: (id: number) => `${BASE_URL}/style/${id}`,

  GET_CHANNEL_SCHEDULE: (id: number) => `${BASE_URL}/style/${id}`,

  GET_CHANNEL_SOURCES: (id: number) => `${BASE_URL}/source/${id}`,
  UPDATE_CHANNEL_SOURCES: (id: number) => `${BASE_URL}/source/${id}`,
  FETCH_CHANNEL_SOURCES: `${BASE_URL}/source`,
};
