import { useState } from 'react';

import { LoadingIcon } from '@common/components';
import { IssueList } from '@issues/components/IssueList';
import { LabelPicker } from '@issues/components/LabelPicker';
import { State } from '@issues/interfaces';
import { useIssuesQuery } from '@issues/queries';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { data, isLoading } = useIssuesQuery({ state, labels: selectedLabels });

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
