import { Link } from "react-router-dom";

export const TagMarquee = () => {
  const tags = [
    "Nature",
    "Politics",
    "Art",
    "Technology",
    "Lifestyle",
    "Expository",
    "Fashion",
    "Tourism",
  ];
  return (
    <div className="overflow-y-scroll flex flex-row justify-evenly pt-14 pb-2">
      {tags.map((tag) => (
        <Link
          to={`/search/${tag}`}
          key={tag}
          className="border border-black md:text-2xl px-4 py-1 mr-2"
        >
          <p>{tag}</p>
        </Link>
      ))}
    </div>
  );
};
