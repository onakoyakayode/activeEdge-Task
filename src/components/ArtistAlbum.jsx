import React, { useEffect } from "react";
import { fetchAlbumsWithPhotos } from "./redux/albumSlice";
import { useDispatch, useSelector } from "react-redux";

const ArtistAlbum = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.list);
  const status = useSelector((state) => state.albums.status);
  const error = useSelector((state) => state.albums.error);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAlbumsWithPhotos());
    }
  }, [status, dispatch]);

  console.log(albums);

  return (
    <div className="w-full p-5 h-screen relative">
      <h2 className="text-3xl mb-10 text-center">Albums</h2>
      {status === "loading" && <div>Loading....</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" && (
        <ul className="flex flex-col w-full h-screen">
          {albums.map((album) => (
            <li key={album.id}>
              <h4 className="text-center mb-3">{album.title}</h4>
              <ul className="flex justify-center gap-3 w-full flex-wrap overflow-hidden">
                {album.photos.map((photo) => (
                  <li key={photo.id} className="w-[250px] h-[250px]">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-[100%] h-[80%] object-cover"
                    />
                    <p>{photo.title}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistAlbum;
