const About = () => {
  return (
    <div className="bg-[#cfe7f1]">
      <section className="my-8 ">
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <h2 className="text-3xl font-semibold leading-none tracking-tighter text-center sm:text-4xl">
            About Us
          </h2>
          <h1 className="text-xl px-10  md:text-2xl font-semibold leading-none tracking-tighter  text-center ">
            Welcome to PetAdopt, your go-to platform for finding and adopting
            pets in need of loving homes. Our mission is to connect rescue
            animals with families who can give them a better life.
          </h1>
          <p className="text-lg text-center text-cyan-500">
            Using our website is simple. Browse through various categories to
            find pets that match your preferences. Each pet has a detailed
            profile with information about their personality, history, and
            needs. Once you find a pet you are interested in, you can contact
            the rescue center to start the adoption process.
          </p>
          <p className="px-6 py-2 text-2xl font-semibold text-center">
            We created this website to address the growing need for pet adoption
            and to help reduce the number of animals in shelters. By making the
            adoption process easier and more accessible, we hope to give more
            pets the chance to find a loving home.
          </p>
          <div className="flex justify-center space-x-3">
            <img
              src="https://i.ibb.co/C6fVSfL/IMG-20240518-WA0032.jpg"
              alt=""
              className="w-20 h-20 bg-center bg-cover rounded-md "
            />
            <div>
              <p className="leading-tight">Rahe Ahmed</p>
              <p className="text-sm leading-tight dark:text-gray-700">
                Founder, Company
              </p>
              <a
                className="flex items-center py-2 space-x-1 text-sm dark:text-violet-600"
                href="/"
              >
                <span>Read full story</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
