import { LoadingIcon } from '@common/components';
import { useLabelsQuery } from '@issues/queries';

interface LabelPickerProps {
  selectedLabels: string[];
  onLabelSelected: (labelName: string) => void;
}

export const LabelPicker = ({
  selectedLabels,
  onLabelSelected,
}: LabelPickerProps) => {
  const { data, isLoading } = useLabelsQuery();

  if (isLoading) return <LoadingIcon />;

  return (
    <>
      {data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) && 'label-active'}`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onLabelSelected(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
