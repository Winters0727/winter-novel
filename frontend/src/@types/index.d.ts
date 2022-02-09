interface defaultInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Article extends defaultInfo {
  user: string;
  userNickname: string;
  title: string;
  content: string;
}

interface Novel extends defaultInfo {
  user: string;
  userNickname: string;
  title: string;
  description: string;
  illustration: string | null;
}

interface Chapter extends defaultInfo {
  novel: number;
  order: number;
  title: string;
  content: string;
}
