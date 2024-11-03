type Props = {
  label: string;
  name: string;
  value: string;
  defaultChecked: boolean;
  errors?: string[];
  className?: string;
};

export default function Checkbox({
  label,
  name,
  value,
  defaultChecked,
  errors,
  className,
}: Props) {
  return (
    <div className={className}>
      <div className="flex flex-row items-center">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          <input
            type="checkbox"
            className={`accent-blue-500`}
            id={name}
            name={name}
            value={value}
            defaultChecked={defaultChecked}
          />
          <label className="text-gray-400 ml-2" htmlFor={name}>
            {label}
          </label>
        </div>
      </div>
      <div className="md:flex md:flex-row md:items-center">
        <div className="w-1/3" />
        <div className="w-2/3">
          <ul className="space-y-2">
            {errors &&
              errors.map((error: string) => (
                <li className="text-sm text-red-500" key={error}>
                  {error}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
