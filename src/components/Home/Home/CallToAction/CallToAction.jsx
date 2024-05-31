const CallToAction = () => {
  return (
    <div>
      <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src="https://i.ibb.co/vxBTKMV/pexels-jakkel-325490.jpg"
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
            <div className="space-y-2">
              <h1 className="inline-block text-2xl font-semibold sm:text-3xl">
                Adopt a Pet and Give Them a Better Life
              </h1>
            </div>
            <div className="dark:text-gray-800">
              <p>
                Inspirational stories and images that will encourage you to
                adopt a pet. Give a pet a new life today.Adopting a pet can be a
                daunting task. Here are some tips and tricks to help you find
                your new best friend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
