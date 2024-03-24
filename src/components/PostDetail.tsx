import { Post, Comment } from "@/types";
import PostBlock from "./PostBlock";
import { FaChevronLeft } from "react-icons/fa";
import { Button, Text, Textarea } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { userInfoSelector } from "@/state/userState";
import { useRecoilValue } from "recoil";

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
  const userInfo = useRecoilValue(userInfoSelector);

  // コメントの更新
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
    const params = {
      userId: comment.userId,
      commentId: comment.id,
    };
    await fetch("/api/commentFavorites", {
      method: "POST",
      body: JSON.stringify(params),
    })
      .then(async (r) => {
        const newCommentFavorite = await r.json();
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === comment.id) {
              return {
                ...c,
                favorites: [newCommentFavorite, ...c.favorites],
              };
            } else {
              return c;
            }
          })
        );
      })
      .catch((e) => console.log(e));
  };

  const deleteCommentFavorite = async (comment: Comment): Promise<void> => {
    const params = {
      userId: userInfo.id,
      comment: comment.id,
    };
    await fetch(`/api/commentFavorites`, {
      method: "DELETE",
      body: JSON.stringify(params),
    })
      .then(() => {
        setComments((prev) =>
          prev.map((c) => {
            if (comment.id === c.id) {
              return {
                ...c,
                favorites: c.favorites.filter(
                  (f) => f.commentId !== Number(comment.id)
                ),
              };
            } else {
              return c;
            }
          })
        );
      })
      .catch((e) => console.log(e));
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
        isComment={false}
        onDelete={async () => onDelete()}
        onCreateFavorite={async () => onCreateFavorite()}
        onDeleteFavorite={async () => onDeleteFavorite()}
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
