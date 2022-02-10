import { useParams } from 'react-router-dom';

const NovelDetailView = () => {
  const params = useParams();
  return (
    <>
      <div>{params.NovelID}</div>
    </>
  );
};

export default NovelDetailView;
