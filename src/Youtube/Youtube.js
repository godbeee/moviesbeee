import YouTube from "react-youtube";

function Youtube({ keyYt }) {
  const opts = {
    height: "380",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  return <YouTube videoId={keyYt} opts={opts} />;
}

export default Youtube;
