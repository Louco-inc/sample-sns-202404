import { Post, Comment } from "@/types";
import PostBlock from "./PostBlock";
import { FaChevronLeft } from "react-icons/fa";
import { Button, Text, Textarea } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  post: Post;
  onDelete: () => void;
  onCreateFavorite: () => void;
  onDeleteFavorite: () => void;
  goBackTimeline: () => void;
  createComment: (value: string) => void;
  deleteComment: (comment: Comment) => void;
};

const PostDetail = (props: Props): JSX.Element => {
  const {
    post,
    onDelete,
    onCreateFavorite,
    onDeleteFavorite,
    goBackTimeline,
    createComment,
    deleteComment,
  } = props;
  const [contentValue, setContentValue] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      if (comments < post.comments) {
        setComments((prev) => [post.comments[0], ...prev]);
      } else if (comments > post.comments) {
        const propsCommentIds = post.comments.map((c) => c.id);
        const targetComment = comments.find(
          (c) => !propsCommentIds.includes(c.id)
        );
        if (targetComment) {
          setComments((prev) => prev.filter((p) => p.id !== targetComment.id));
        }
      }
    }
  }, [post.comments]);

  useEffect(() => {
    const init = async (): Promise<void> => {
      await fetch(`/api/posts/${post.id}/comments`)
        .then(async (r) => {
          const newComments: Comment[] = await r.json();
          setComments(newComments);
          setIsLoaded(true);
        })
        .catch((e) => console.log(e));
    };
    init();
  }, []);

  const createCommentFavorite = async (comment: Comment): Promise<void> => {
    // commentテーブルにfavoritesカラムを追加する
  };

  const deleteCommentFavorite = async (comment: Comment): Promise<void> => {
    // commentテーブルにfavoritesカラムを追加する
  };

  const handleCreateComment = (): void => {
    if (!contentValue) return;
    setContentValue("");
    createComment(contentValue);
  };

  return (
    <div>
      <div>
        <Button
          leftIcon={<FaChevronLeft />}
          variant="ghost"
          onClick={goBackTimeline}
        >
          <Text fontSize="lg">タイムライン</Text>
        </Button>
      </div>
      <PostBlock
        post={post}
        key={post.id}
        onDelete={async () => onDelete(post)}
        onCreateFavorite={async () => onCreateFavorite(post)}
        onDeleteFavorite={async () => onDeleteFavorite(post)}
      />
      <div className="flex mt-8 bg-white m-4 p-4 rounded-2xl">
        <div className="mr-2">
          <Image
            src="/images/profile_icon1.png"
            width={36}
            height={36}
            alt="profile_img"
          />
        </div>
        <Textarea
          size="lg"
          variant="unstyled"
          placeholder="いまなにしてる？"
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
        />
        <Button
          className="!bg-post-color !text-white mt-8 ml-4"
          variant="solid"
          onClick={() => handleCreateComment()}
        >
          投稿する
        </Button>
      </div>
      <div>
        {comments.map((comment) => {
          return (
            <PostBlock
              post={comment}
							isComment={true}
              key={comment.id}
              onDelete={async () => deleteComment(comment)}
              onCreateFavorite={async () =>
                await createCommentFavorite(comment)
              }
              onDeleteFavorite={async () =>
                await deleteCommentFavorite(comment)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostDetail;
