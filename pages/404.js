export default function Custom404() {
  // not the proper way to always fix footer position (refering to `min-h-screen`)
  return (
    <h1 className="text-center m-4 font-latoBold text-lg min-h-screen ">
      This is a custom 404, the page you are looking is not found or is not made
      at all to begin with (such as the /cart page)
    </h1>
  );
}
