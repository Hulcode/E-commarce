import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group cursor-pointer "
      onClick={() => {
        navigate(`product/${item._id}`);
      }}
    >
      <div className="overflow-hidden bg-gray-100">
        <img
          src={item?.images?.[0]}
          alt={item.name}
          className="w-full aspect-[3/4] object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-col  ">
        <h3 className="text-sm text-gray-800 line-clamp-2">{item.name}</h3>

        <p className="mt-2 font-medium">${item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
