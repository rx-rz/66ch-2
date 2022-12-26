import ShareOnSocial from "react-share-on-social";
import favicon from "src/assets/66ch.png";

type ShareButtonsProps = {
  postTitle: string;
  postAuthor: string;
  postId: string;
  description: string;
};

export const ShareButtons = ({
  description,
  postAuthor,
  postId,
  postTitle,
}: ShareButtonsProps) => {
  return (
    <div className="my-4">
      <ShareOnSocial
        textToShare={
          postTitle && postAuthor && `"${postTitle}" by ${postAuthor} - 66CH`
        }
        link={postId && `/post/${postId}`}
        linkTitle={postTitle && postTitle}
        linkMetaDesc={description && description}
        linkFavicon={favicon}
        noReferer
      >
        <button
          className="border-2 border-tertiary 
         bg-primary px-1 text-secondary md:text-xl text-md font-pilcrow
          "
        >
          Share This Post
        </button>
      </ShareOnSocial>
    </div>
  );
};
