import { motion } from "framer-motion";
type CardProps = {
  authorName: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  tag: string;
  description: string;
  loading?: "eager" | "lazy";
};

export function BlogCard({
  authorName,
  postTitle,
  imageUrl,
  dateCreated,
  tag,

  description,
}: CardProps) {
  return (
    <article className="w-full border border-black dark:border-white md:h-[700px] text-clip overflow-clip h-fit dark:text-white dark:bg-tertiary">
      <div className="md:p-8 p-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg md:text-2xl font-pilcrow mr-2">{dateCreated}</p>
          <p className="text-xl md:text-3xl font-pilcrow">{authorName}</p>
        </motion.div>

        <img
          src={imageUrl}
          alt={postTitle}
          className="aspect-video object-cover border border-black my-4"
          loading="lazy"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-h-72 overflow-clip">
            <h1 className="text-3xl md:text-5xl font-pilcrow uppercase text-ellipsis">
              {postTitle}
            </h1>
            <h2 className="text-lg md:text-2xl font-hind text-ellipsis">
              {description}
            </h2>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
