const BASE_URL = 'https://your-api-domain.com/api';

export const API = {
  CHANNELSTYLE: {
    GET_ALL: `${BASE_URL}/channels`,
    GET_CHANNEL_STYLE: (id: number) => `${BASE_URL}/style/${id}`,
  },
  CHANNELSCHEDULE: {},
};
