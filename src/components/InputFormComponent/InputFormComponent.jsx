const InputFormComponent = ({
  id,
  name,
  type,
  valueInput,
  pattern = null,
  handleOnchange,
  ...rest
}) => {
  return (
    <input
      {...rest}
      id={id}
      name={name}
      type={type}
      autoComplete="current-password"
      required
      pattern={pattern}
      value={valueInput}
      onChange={(event) => handleOnchange(event)}
      className="block w-full rounded-md border-0 border-transparent px-1.5 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus:ring-inset sm:text-sm sm:leading-6"
    />
  );
};

export default InputFormComponent;
