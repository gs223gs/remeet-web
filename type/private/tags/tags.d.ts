export type Tag = {
  id: string;
  name: string;
};

type TagErrors = {
  id?: string;
  tag?: string;
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};
