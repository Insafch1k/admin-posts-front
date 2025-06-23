export const CHANNEL_TOPICS = [
  '📚 Образование и саморазвитие',
  '📰 Новости и Аналитика',
  '💸 Финансы и инвестиции',
  '💪 ЗОЖ, спорт и здоровье',
  '😂 Юмор и развлечение',
] as const;

export type ChannelTopic = (typeof CHANNEL_TOPICS)[number];
