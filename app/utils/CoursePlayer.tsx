// import React, { FC, useEffect, useState } from "react";
// import axios from "axios";

// type Props = {
//   videoUrl: string;
//   title: string;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl }) => {
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: "",
//   });

//   useEffect(() => {
//     axios
//       .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
//         videoId: videoUrl,
//       })
//       .then((res) => {
//         setVideoData(res.data);
//       });
//   }, [videoUrl]);

//   return (
//     <div style={{ paddingTop: "41%", position: "relative" }}>
//       {videoData.otp && videoData.playbackInfo !== "" && (
//         <iframe
//           src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=g37CVmVLGqpe941b`}
//           style={{
//             border: 0,
//             width: "90%",
//             height: "100%",
//             position: "absolute",
//             top: 0,
//             left: 0,
//           }}
//           allowFullScreen={true}
//           allow="encrypted-media"
//         ></iframe>
//       )}
//     </div>
//   );
// };

// export default CoursePlayer;
import React, { FC } from "react";

type Props = {
  videoUrl: string; // The complete YouTube URL or just the video ID
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl,title }) => {
  // Function to extract YouTube video ID from a full YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const urlParts = url.split("v=");
    return urlParts.length > 1 ? urlParts[1].split("&")[0] : url;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          border: 0,
          width: "90%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        title={title}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CoursePlayer;

