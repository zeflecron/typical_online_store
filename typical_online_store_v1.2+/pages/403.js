export default function Custom403() {
  // not the proper way to always fix footer position (refering to `min-h-screen`)
  return (
    <h1 className="text-center m-4 font-latoBold text-lg min-h-screen ">
      This is a custom 403, an authorization problem
    </h1>
  );
}
