import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatarDefault from "../../../public/assets/user.png";
import Image from "next/image";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
  useAddReplyInReviewMutation,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports: ["websocket"]});

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const course = courseData?.course;
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification",{
        title:`New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      })
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer Added Successfully");
      if(user.role !== "admin"){
         socketId.emit("notification",{
        title:`New Reply Received`,
        message: `You have a new question reply in ${data[activeVideo].title}`,
        userId: user._id,
      })
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully");
       socketId.emit("notification",{
        title:`New Review Received`,
        message: `You have a new Review in ${data[activeVideo].title}`,
        userId: user._id,
      })
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error, isSuccess, refetch, courseRefetch, answerError, answerSuccess, reviewError, reviewSuccess, replySuccess, replyError, data, activeVideo, user._id, user.role]);

  // const handleAnswerSubmit = () => {
  //   // answer,courseId,contentId,questionId
  //   addAnswerInQuestion({
  //     answer,
  //     courseId: id,
  //     contentId: data[activeVideo]._id,
  //     questionId: questionId,
  //   });
  // };
  const handleAnswerSubmit = ({
    answer,
    questionId,
  }: {
    answer: string;
    questionId: string;
  }) => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId,
    });
  };

  if (!data || !Array.isArray(data) || !data[activeVideo]) {
    return <Loader />;
  }

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer  ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatarDefault}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-black"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              // answer={answer}
              // setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : avatarDefault}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent 800px:ml-3 border
                       border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded
                        text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full my-5" key={item._id || index}>
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : avatarDefault
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px] dark:text-[#ffffff83] text-[#0000009e]">
                          {item?.user.name}
                        </h1>
                        <Ratings rating={item.rating} />
                        <p className="dark:text-[#ffffff83] text-[#0000009e]">
                          {item.comment}
                        </p>
                        <small className="text-[#0000009e] dark:text-[#ffffff83]">
                          {format(item.createdAt)} .
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <span
                        className={`${styles.label} !ml-10 cursor-pointer dark:text-[#ffffff83] text-[#0000009e]`}
                        // onClick={() => {
                        //   setIsReviewReply(true);
                        //   setReviewId(item._id);
                        // }}
                        onClick={() => {
                          if (reviewId === item._id) {
                            setReviewId(""); // toggle off
                          } else {
                            setReviewId(item._id); // show input for this review only
                          }
                        }}
                      >
                        add Reply
                      </span>
                    )}
                    {reviewId === item._id && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter you reply..."
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          className="block 800px:ml-12 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%] dark:text-[#ffffff83] text-[#0000009e]"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1 dark:text-[#ffffff83] text-[#0000009e]"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {item.commentReplies.map((i: any, index: number) => (
                      <div
                        className="w-full flex 800px:ml-16 my-5"
                        key={i._id || index}
                      >
                        <div className="w-[50px] h-[50px]">
                          <div>
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : avatarDefault
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px] dark:text-[#ffffff83] text-[#0000009e]">
                              {i.user.name}
                            </h5>
                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                          </div>
                          <p className="dark:text-[#ffffff83] text-[#0000009e]">
                            {i.comment}
                          </p>
                          <small className="dark:text-[#ffffff83] text-[#0000009e]">
                            {format(i.createdAt)} .
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

// const CommentReply = ({
//   data,
//   activeVideo,
//   // answer,
//   // setAnswer,
//   handleAnswerSubmit,
//   user,
//   setQuestionId,
//   answerCreationLoading,
// }: any) => {
//   return (
//     <>
//       <div className="w-full my-3">
//         {data[activeVideo]?.questions.map((item: any, index: number) => (
//           <CommentItem
//             key={item._id || index}
//             data={data}
//             activeVideo={activeVideo}
//             item={item}
//             index={index}
//             answer={answer}
//             setAnswer={setAnswer}
//             setQuestionId={setQuestionId}
//             handleAnswerSubmit={handleAnswerSubmit}
//             answerCreationLoading={answerCreationLoading}
//           />
//         ))}
//       </div>
//     </>
//   );
// };
const CommentReply = ({
  data,
  activeVideo,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <div className="w-full my-3">
      {data[activeVideo]?.questions.map((item: any, index: number) => (
        <CommentItem
          key={item._id || index}
          item={item}
          setQuestionId={setQuestionId}
          handleAnswerSubmit={handleAnswerSubmit}
          answerCreationLoading={answerCreationLoading}
          user={user}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  setQuestionId,
  item,
  // answer,
  // setAnswer,
  user,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);
  const [answer, setAnswer] = useState("");
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          {/* <div className="w-[50px] h-[50px]">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <h1 className="uppercase text-[18px]">
                {item.user.name.slice(0, 2)}
              </h1>
            </div>
          </div> */}
          <Image
            src={item.user.avatar ? item.user.avatar.url : avatarDefault}
            width={50}
            height={50}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item.user.name}</h5>
            <p>{item.question}</p>
            <small className="dark:text-[#ffffff83] text-black">
              {!item.createdAt ? "" : format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setreplyActive(!replyActive);

              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-[#000000b8]"
          ></BiMessage>
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any, idx: number) => (
              <div
                key={idx}
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
              >
                <div>
                  <Image
                    src={
                      item.user.avatar ? item.user.avatar.url : avatarDefault
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#50c750] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#000000b8] dark:text-[#ffffff83]">
                    {format(item.createdAt)} .
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Write your Answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] text-black dark:text-white p-[5px] w-[95%] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 text-black dark:text-white"
                  // onClick={handleAnswerSubmit}
                  onClick={() => {
                    handleAnswerSubmit({
                      answer,
                      questionId: item._id,
                    });
                    setAnswer(""); // clear after submit
                  }}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
