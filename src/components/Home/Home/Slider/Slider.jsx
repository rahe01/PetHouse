const Slider = () => {
  return (
    <div className="bg-[url('https://i.ibb.co/Yj0zv0y/pexels-emhopper-1084425.jpg')] bg-cover bg-center bg-no-repeat">
      <section className="">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Welcome To 
            <span className="text-[#5dbfec]"> Petenica</span>
           
          </h1>
          <p className="px-5 mt-8 mb-12 text-lg font-medium">
          Petenica connects loving homes with rescue animals, offering a seamless adoption process and detailed profiles for each pet. Discover your new best friend and give a deserving animal a forever home.
          </p>
          <div className="flex flex-wrap justify-center">
            <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-[#5dbfec] dark:text-gray-50">
              Get started
            </button>
            <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-900 dark:border-gray-300">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slider;
