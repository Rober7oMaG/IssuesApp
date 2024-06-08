import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Issue, State } from '@issues/interfaces';
// import { getIssueByNumber, getIssueComments } from '@issues/services';

type IssueItemProps = {
  issue: Issue;
};

export const IssueItem = ({ issue }: IssueItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { number, state, title, user, comments, labels } = issue;

  // const prefetchData = () => {
  //   queryClient.prefetchQuery({
  //     queryKey: ['issue', number],
  //     queryFn: () => getIssueByNumber(number),
  //     staleTime: 1000 * 30, // 30 seconds
  //   });

  //   queryClient.prefetchQuery({
  //     queryKey: ['issue', number, 'comments'],
  //     queryFn: () => getIssueComments(number),
  //     staleTime: 1000 * 30, // 30 seconds
  //   });
  // };

  const presetData = () => {
    queryClient.setQueryData(['issue', number], issue, {
      updatedAt: new Date().getTime() + 180000,
    });

    queryClient.setQueryData(['issue', number, 'comments'], comments, {
      updatedAt: new Date().getTime() + 180000,
    });
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened 2 days ago by{' '}
            <span className="fw-bold">{user.login}</span>
          </span>

          <div>
            {labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: 'black' }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
