import { getLabelsQuery } from "../queries";

export const LabelPicker = () => {
  const { data, isLoading } = getLabelsQuery();

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      {
        data?.map(label => (
          <span 
            key={label.id}
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))
      }
    </>
  );
};
