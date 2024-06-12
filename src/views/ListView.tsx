import { useEffect, useState } from 'react';

import { LoadingIcon } from '@components/common';
import { IssueList } from '@components/issues/IssueList';
import { LabelPicker } from '@components/issues/LabelPicker';
import { State } from '@interfaces';
import { useIssuesQuery } from '@queries';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, selectedLabels]);

  const { data, isLoading, isFetching } = useIssuesQuery({
    state,
    labels: selectedLabels,
    page,
  });

  const nextPage = () => {
    if (data?.length === 0) return;

    setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const onLabelSelected = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={data || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={previousPage}
            disabled={page === 1 || isFetching}
          >
            Previous
          </button>
          <span>{isFetching ? 'Loading...' : `Page: ${page}`}</span>
          <button
            className="btn btn-outline-primary"
            onClick={nextPage}
            disabled={isFetching}
          >
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelSelected={(labelName) => onLabelSelected(labelName)}
        />
      </div>
    </div>
  );
};
