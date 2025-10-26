export type Tag = {
  id: string;
  name: string;
};

type TagErrors = {
  tag: string[];
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};
