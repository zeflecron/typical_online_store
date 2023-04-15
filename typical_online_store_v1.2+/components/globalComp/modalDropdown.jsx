// options must contain "name" and "option" as the key
export default function ModalDropdown(props) {
  const { show, buttonPosition, options, handleOptions } = props;

  const handleClick = (option) => {
    handleOptions(option);
  };

  return (
    // sometimes the button position is just null when manually inputing the link
    <div
      className={`absolute z-10 top-0 left-0 w-auto mt-4 bg-white rounded border-lime-500 border-2 ${
        show ? "block" : "hidden"
      }`}
      style={
        buttonPosition !== null
          ? { top: buttonPosition.top, left: buttonPosition.left }
          : {}
      }
    >
      <ul>
        {options.map((o) => (
          <li
            key={o.name}
            className="px-4 py-2 hover:bg-gray-300 hover:cursor-pointer"
            onClick={() => handleClick(o.option)}
          >
            {o.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
