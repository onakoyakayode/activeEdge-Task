import React, { useEffect } from "react";
import { fetchArtists } from "./redux/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ArtistLists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.list);
  const status = useSelector((state) => state.artists.status);
  const error = useSelector((state) => state.artists.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArtists());
    }
  }, [status, dispatch]);

  return (
    <div className="w-full flex flex-col items-center p-5">
      <h2 className="text-3xl mb-6">All Artists</h2>
      {status === "loading" && <div>Loading....</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" && (
        <ul className="w-full flex justify-center flex-wrap gap-6">
          {artists.map((artist) => (
            <li
              key={artist.id}
              className="flex flex-col items-center justify-between w-[80%] h-[300px] mb-7 lg:mb-0 lg:w-[250px] lg:h-[300px] shadow-lg rounded py-4"
            >
              <div></div>
              <Link
                key={artist.id}
                to={`/album/${artist.id}`}
                className="text-[17px]"
              >
                {artist.name}
              </Link>
              <Link
                to={`/artist/${artist.id}`}
                className="bg-green-500 text-white p-2 rounded text-[14px]"
              >
                View tweet
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistLists;
