
import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string; // The complete YouTube URL or VdoCipher video ID
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  
  // Function to check if the URL is a YouTube URL
  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Function to extract YouTube video ID from a full YouTube URL or short URL
  const getYouTubeVideoId = (url: string) => {
    let videoId = "";
    // Check if it's a full YouTube URL
    if (url.includes("youtube.com")) {
      const urlParts = url.split("v=");
      videoId = urlParts.length > 1 ? urlParts[1].split("&")[0] : url;
    } 
    // Check if it's a short YouTube URL
    else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1];
    }
    return videoId;
  };

  // Check if the video is from VdoCipher (assuming non-YouTube URLs are VdoCipher IDs)
  useEffect(() => {
    if (!isYouTubeUrl(videoUrl)) {
      // Fetch VdoCipher OTP and playbackInfo only for non-YouTube videos
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          setVideoData(res.data);
        });
    }
  }, [videoUrl]);

  // If it's a YouTube video, extract the video ID
  const videoId = isYouTubeUrl(videoUrl) ? getYouTubeVideoId(videoUrl) : null;

  return (
    <div style={{ paddingTop: "41%", position: "relative",overflow:"hidden" }}>
      {videoId ? (
        // YouTube Player
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
      ) : videoData.otp && videoData.playbackInfo !== "" ? (
        // VdoCipher Player
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=g37CVmVLGqpe941b`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CoursePlayer;




// // import React, { FC, useEffect, useState } from "react";
// // import axios from "axios";

// // type Props = {
// //   videoUrl: string;
// //   title: string;
// // };

// // const CoursePlayer: FC<Props> = ({ videoUrl }) => {
// //   const [videoData, setVideoData] = useState({
// //     otp: "",
// //     playbackInfo: "",
// //   });

// //   useEffect(() => {
// //     axios
// //       .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
// //         videoId: videoUrl,
// //       })
// //       .then((res) => {
// //         setVideoData(res.data);
// //       });
// //   }, [videoUrl]);

// //   return (
// //     <div style={{ paddingTop: "41%", position: "relative" }}>
// //       {videoData.otp && videoData.playbackInfo !== "" && (
// //         <iframe
// //           src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=g37CVmVLGqpe941b`}
// //           style={{
// //             border: 0,
// //             width: "90%",
// //             height: "100%",
// //             position: "absolute",
// //             top: 0,
// //             left: 0,
// //           }}
// //           allowFullScreen={true}
// //           allow="encrypted-media"
// //         ></iframe>
// //       )}
// //     </div>
// //   );
// // };

// // export default CoursePlayer;
// import React, { FC } from "react";

// type Props = {
//   videoUrl: string; // The complete YouTube URL or just the video ID
//   title: string;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
//   // Function to extract YouTube video ID from a full YouTube URL or short URL
//   const getYouTubeVideoId = (url: string) => {
//     let videoId = "";
//     // Check if it's a full YouTube URL
//     if (url.includes("youtube.com")) {
//       const urlParts = url.split("v=");
//       videoId = urlParts.length > 1 ? urlParts[1].split("&")[0] : url;
//     } 
//     // Check if it's a short YouTube URL
//     else if (url.includes("youtu.be")) {
//       videoId = url.split("youtu.be/")[1];
//     }
//     return videoId;
//   };

//   const videoId = getYouTubeVideoId(videoUrl);

//   return (
//     <div style={{ paddingTop: "41%", position: "relative" }}>
//       <iframe
//         src={`https://www.youtube.com/embed/${videoId}`}
//         style={{
//           border: 0,
//           width: "90%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//         title={title}
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// };

// export default CoursePlayer;