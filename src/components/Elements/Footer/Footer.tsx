export const Footer = () => {
  return (
    <footer
      className="h-screen bg-black  text-white font-supreme
       text-center grid place-items-center  md:text-xl xl:text-2xl"
    >
      <div className="max-w-4xl">
        <p>
          66ch celebrates the very best in contemporary creativity. Through our
          print magazine 66ch, the products we make, and the online content we
          publish, we share the work of leading illustrators, artists, designers
          and makers from around the world whose approach excites us, and whose
          style is a good testament to the discipline they practice.
        </p>

        <div>
          <h1 className="my-8">66ch Magazine. © 2022.</h1>
          <div className="flex justify-evenly   mt-10">
            <a
              href="https://www.twitter.com/temiloluwa_js"
              className="my-2 transition-colors duration-300 hover:text-blue-600"
            >
              Twitter
            </a>
            <a
              href="https://www.github.com/temiloluwa-js"
              className="my-2 transition-colors duration-300 hover:text-gray-600"
            >
              Github
            </a>
            <a
              href="https://www.reddit.com/user/SituationInfamous137"
              className="my-2 transition-colors duration-300 hover:text-orange-600"
            >
              Reddit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
