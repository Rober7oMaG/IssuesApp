import { useState } from 'react';

import { LoadingIcon } from '@components/common';
import { IssueList } from '@components/issues/IssueList';
import { LabelPicker } from '@components/issues/LabelPicker';
import { State } from '@interfaces';
import { useInfiniteIssuesQuery } from '@queries';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteIssuesQuery({
      state,
      labels: selectedLabels,
    });

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
            issues={data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <button
          className="btn btn-outline-primary mt-2"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load More
        </button>
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
