export default function Modal({ type, buttonPosition, show, children }) {
  if (type === "dropdown") {
    return (
      <div
        className={`absolute z-10 top-0 left-0 w-auto mt-4 bg-white rounded border-lime-500 border-2 ${
          show ? "block" : "hidden"
        }`}
        style={{ top: buttonPosition.top, left: buttonPosition.left }}
      >
        {children}
      </div>
    );
  } else if (type === "fullscreen") {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
          show ? "block" : "hidden"
        }`}
      >
        <section className="fixed bg-white bg-opacity-100 w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded">
          {children}
        </section>
      </div>
    );
  } else {
    console.log("hello");
  }
}
