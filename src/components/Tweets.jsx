import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "./redux/tweetsSlice";
import TweetForm from "./TweetForm";

const Tweets = () => {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets.list);
  const status = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchTweets());
    }
  }, [status, dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTweet(tweetToUpdate.id));
      console.log("Tweet deleted successfully");
    } catch (error) {
      console.error("Error deleting tweet:", error.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl mb-4 underline">Tweets</h2>
      <TweetForm onDelete={handleDelete} />
      {status === "loading" && <div>Loading......</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" && (
        <ul className="flex flex-col">
          {tweets.map((tweet) => (
            <li
              key={tweet.id}
              className="border-b-1 border-gray-600 flex items-end gap-3 w-full lg:w-[80%]"
            >
              <div>
                <p className="mb-2 uppercase">
                  <strong>{tweet.name}</strong>
                </p>
                <p>{tweet.body}</p>
              </div>
              <button
                onClick={() => handleDelete(tweet.id)}
                className="bg-red-500 text-white p-2 rounded text-[12px]"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tweets;
