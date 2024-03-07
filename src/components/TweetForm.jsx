import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTweets, updateTweet, deleteTweet } from "./redux/tweetsSlice";

const TweetForm = ({ tweetToUpdate, onDelete }) => {
  const dispatch = useDispatch();
  const [tweetText, setTweetText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (tweetToUpdate) {
      setTweetText(tweetToUpdate.body);
    }
  }, [tweetToUpdate]);

  const handleDelete = () => {
    dispatch(deleteTweet(tweetToUpdate.id));

    onDelete();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweetText.length === 0) {
      setError("Please enter a tweet!");
      return;
    }

    if (tweetText.length > 400) {
      setError("Tweet is too long");
      return;
    }

    if (tweetToUpdate) {
      dispatch(updateTweet({ id: tweetToUpdate.id, body: tweetText }));
    } else {
      dispatch(createTweets({ body: tweetText }));
    }

    setError("");
    setTweetText("");
  };

  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl">
        {tweetToUpdate ? "Update Tweet" : "Create Tweet"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col  w-full">
        <textarea
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What is on your mind......"
          className="border border-gray-500 p-2 w-[45%]"
          cols="30"
          rows="10"
        ></textarea>
        {error ? (
          <p className="text-[red] text-13px block mb-2">{error}</p>
        ) : (
          <div style={{ height: "13px" }} />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-[10%]"
        >
          {tweetToUpdate ? "Update" : "Tweet"}
        </button>
        {tweetToUpdate && (
          <button onClick={handleDelete} className="text-red-500">
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default TweetForm;
