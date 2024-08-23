import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ id, image, name, desc }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`album/${id}`)}
      className="min-w-[180px] max-w-[200px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
