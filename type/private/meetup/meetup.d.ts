export type MeetupErrors = {
  name?: string[];
  scheduledAt?: string[];
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};
