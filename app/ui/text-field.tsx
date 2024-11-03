type Props = {
  label: string;
  name: string;
  defaultValue: string;
  errors?: string[];
  className?: string;
};

export default function TextField({
  label,
  name,
  defaultValue,
  errors,
  className,
}: Props) {
  return (
    <div className={className}>
      <div className="md:flex md:flex-row md:items-center">
        <div className="md:w-1/3">
          <label className="text-gray-400" htmlFor={name}>
            {label}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id={name}
            name={name}
            defaultValue={defaultValue}
          />
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
