// options must contain "name" and "option" as the key
export default function ModalConfirmation(props) {
  const { show, shortMessage, rejectOption, acceptOption, handleOptions } =
    props;

  const handleClick = (option) => {
    handleOptions(option);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        show ? "block" : "hidden"
      }`}
    >
      <section className="fixed bg-white bg-opacity-100 w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded">
        <span className="block p-4 font-latoBold text-lg">{shortMessage}</span>
        <div className="flex justify-between">
          <button
            className="flex p-2 bg-red-500 hover:bg-red-400 text-white text-lg border-b-4 border-red-700 hover:border-red-500 rounded"
            onClick={() => handleClick(rejectOption)}
          >
            {rejectOption}
          </button>
          <button
            className="flex p-2 bg-teal-500 hover:bg-teal-400 text-white text-lg border-b-4 border-teal-700 hover:border-teal-500 rounded"
            onClick={() => handleClick(acceptOption)}
          >
            {acceptOption}
          </button>
        </div>
      </section>
    </div>
  );
}
