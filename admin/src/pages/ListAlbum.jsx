import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const removeAlbum = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/album/remove`, {
        data: { id },
      });
      if (response.data.success) {
        await fetchAlbums();
        toast.success(response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <div>
      <p>All albums list</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Cover</b>
          <b>Action</b>
        </div>
        {data.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img src={item.image} alt="image" className="w-12" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgColor} />
            <p onClick={() => removeAlbum(item._id)} className="cursor-pointer">
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
