import { Link, useNavigate, useParams } from 'react-router-dom';

import { LoadingIcon } from '@common/components';
import { IssueComment } from '@issues/components/IssueComment';
import { useIssueByNumberQuery, useIssueCommentsQuery } from '@issues/queries';

export const IssueView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { id = '0' } = params;

  const { data: query, isLoading: isQueryLoading } = useIssueByNumberQuery(+id);
  const { data: comments, isLoading: isCommentsLoading } =
    useIssueCommentsQuery(+id);

  if (isQueryLoading) return <LoadingIcon />;

  if (!query) return navigate('/issues/list');

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* First comment */}
      <IssueComment issue={query} />

      {/* Other comments */}
      {isCommentsLoading ? (
        <LoadingIcon />
      ) : (
        comments?.map((issue) => <IssueComment key={issue.id} issue={issue} />)
      )}
    </div>
  );
};
