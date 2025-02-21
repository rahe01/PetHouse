const CategorieCard = ({ category }) => {
  const { name, image, description } = category;
  return (
    <div className="container p-6 mx-auto">
      <div className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img
          src={image}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">
              {name}
            </h2>
            <p className="dark:text-gray-800">
              {description}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-[#5dbfec] dark:text-gray-50"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorieCard;
