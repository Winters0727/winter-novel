import { useParams } from 'react-router-dom';

const ArticleDetailView = () => {
  const params = useParams();
  return (
    <>
      <div>{params.ArticleID}</div>
    </>
  );
};

export default ArticleDetailView;
