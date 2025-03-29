import NewsKitPlayerPage from "./presenter/NewsKitPlayerPresenter";
export const ReactRoot = () => {
  return (
    <div style={{ padding: "40px" }}>
      {" "}
      <h1>Audio Player MVP Structure Test</h1>{" "}
      <h2>NewsKit Audio Player Demo</h2> <NewsKitPlayerPage />{" "}
    </div>
  );
};
