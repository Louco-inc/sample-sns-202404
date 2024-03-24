import Header from "@/components/header";
import { Button, Text, useToast } from "@chakra-ui/react";
import { FcTimeline } from "react-icons/fc";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { MdNotificationsNone, MdMailOutline } from "react-icons/md";
import { Post, Comment, User } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { userInfoSelector } from "@/state/userState";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import PostForm from "@/components/PostForm";
import { formattedAccountName } from "@/utils";
import PostBlock from "@/components/PostBlock";
import PostDetail from "@/components/PostDetail";

const TimelinePage = (): JSX.Element => {
  const [timelineData, setTimelineData] = useState<Post[]>([]);
  const [isOpenPostForm, setIsOpenPostForm] = useState<boolean>(false);
  const [postDetail, setPostDetail] = useState<Post | undefined>(undefined);
  const userInfo = useRecoilValue<User>(userInfoSelector);
  const toast = useToast();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const timelineData: Post[] = await fetch("/api/posts").then(
        async (r) => await r.json()
      );
      setTimelineData(timelineData);
    };
    init();
  }, []);

  const openPostModal = (): void => {
    setIsOpenPostForm(true);
  };

  const postForm = async (content: string): Promise<void> => {
    const params = {
      content,
      userId: userInfo.id,
    };
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(params),
    })
      .then(async (r) => {
        const res: Post = await r.json();
        setTimelineData((prev) => [res, ...prev]);
        setIsOpenPostForm(false);
        toast({
          title: "投稿を作成しました",
          status: "success",
          duration: 3000,
        });
      })
      .catch((r) => console.log(r));
  };

  const postDelete = async (post: Post): Promise<void> => {
    await fetch(`/api/posts/${post.id}`, { method: "DELETE" })
      .then(async () => {
        setTimelineData((res) => res.filter((p) => p.id !== post.id));
        toast({
          title: "投稿を削除しました",
          status: "success",
          duration: 3000,
        });
      })
      .catch((e) => console.log(e));
  };

  const createdFavorite = async (post: Post): Promise<void> => {
    const params = {
      postId: post.id,
      userId: userInfo.id,
    };
    await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify(params),
    })
      .then(async (r) => {
        const createdFavoriteValue = await r.json();
        setTimelineData((prev) =>
          prev.map((post) => {
            if (post.id === createdFavoriteValue.postId) {
              return {
                ...post,
                favorites: [...post.favorites, createdFavoriteValue],
              };
            } else {
              return post;
            }
          })
        );
      })
      .catch((e) => console.log(e));
  };

  const deleteFavorite = async (targetPost: Post): Promise<void> => {
    const params = {
      postId: targetPost.id,
      userId: userInfo.id,
    };
    await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify(params),
    })
      .then(async () => {
        setTimelineData((prev) =>
          prev.map((post) => {
            if (post.id === targetPost.id) {
              return {
                ...post,
                favorites: post.favorites.filter(
                  (p) => p.postId !== Number(post.id)
                ),
              };
            } else {
              return post;
            }
          })
        );
      })
      .catch((e) => console.log(e));
  };

  const createComment = async (value: string): Promise<void> => {
    if (!postDetail) return;
    const params = {
      userId: userInfo.id,
      postId: postDetail.id,
      content: value,
    };
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(params),
    })
      .then(async (r) => {
        const newComment = await r.json();
        setTimelineData((prev) =>
          prev.map((post) => {
            if (post.id === postDetail.id) {
              return {
                ...post,
                comments: [newComment, ...post.comments],
              };
            } else {
              return post;
            }
          })
        );
        setPostDetail((prev) => {
          if (prev) {
            return {
              ...prev,
              comments: [newComment, ...prev.comments],
            };
          } else {
            return undefined;
          }
        });
      })
      .catch((e) => console.log(e));
  };

  const deleteComment = async (comment: Comment): Promise<void> => {
    await fetch(`/api/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTimelineData((prev) =>
          prev.map((post) => {
            if (post.id === comment.postId) {
              return {
                ...post,
                comments: post.comments.filter((pc) => pc.id !== comment.id),
              };
            } else {
              return post;
            }
          })
        );
        setPostDetail((prev) => {
          if (prev) {
            return {
              ...prev,
              comments: prev.comments.filter((pc) => pc.id !== comment.id),
            };
          } else {
            return undefined;
          }
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center bg-main-color h-[calc(100vh-48px)]">
        <div className="w-1/6">
          <div className="flex flex-col h-[calc(100vh-108px)] px-8">
            <div className="flex justify-center my-4">
              <Image
                src="/images/now_logo.png"
                width={90}
                height={28}
                alt="profile_img"
              />
            </div>
            <Button className="py-6" leftIcon={<FcTimeline />} variant="ghost">
              <Text fontSize="lg">タイムライン</Text>
            </Button>
            <Button className="py-6" leftIcon={<FaSearch />} variant="ghost">
              <Text fontSize="lg">検索</Text>
            </Button>
            <Button
              className="py-6"
              leftIcon={<MdNotificationsNone />}
              variant="ghost"
            >
              <Text fontSize="lg">通知</Text>
            </Button>
            <Button
              className="py-6"
              leftIcon={<MdMailOutline />}
              variant="ghost"
            >
              <Text fontSize="lg">メッセージ</Text>
            </Button>
            <Button
              className="py-6"
              leftIcon={<FaRegBookmark />}
              variant="ghost"
            >
              <Text fontSize="lg">ブックマーク</Text>
            </Button>
            <Button
              className="!bg-post-color !text-white mt-8"
              variant="solid"
              onClick={openPostModal}
            >
              投稿する
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              className="my-1"
              src="/images/profile_icon1.png"
              width={40}
              height={40}
              alt="profile_img"
            />
            <div className="ml-2 flex flex-col">
              <span>{userInfo.nickname}</span>
              <span className="text-xs text-account-name-color">
                {formattedAccountName(userInfo.email)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-3/6 overflow-y-auto">
          {postDetail ? (
            <PostDetail
              post={postDetail}
              onDelete={async () => await postDelete(postDetail)}
              onCreateFavorite={async () => await createdFavorite(postDetail)}
              onDeleteFavorite={async () => await deleteFavorite(postDetail)}
              goBackTimeline={() => setPostDetail(undefined)}
              createComment={async (value: string) =>
                await createComment(value)
              }
              deleteComment={async (comment: Comment) =>
                await deleteComment(comment)
              }
            />
          ) : (
            timelineData.map((post) => {
              return (
                <PostBlock
                  post={post}
                  key={post.id}
                  isComment={false}
                  onDelete={async () => await postDelete(post)}
                  onCreateFavorite={async () => await createdFavorite(post)}
                  onDeleteFavorite={async () => await deleteFavorite(post)}
                  openPostDetail={() => setPostDetail(post)}
                />
              );
            })
          )}
        </div>
      </div>
      <PostForm
        isOpenModal={isOpenPostForm}
        onClose={() => setIsOpenPostForm(false)}
        postForm={async (content) => await postForm(content)}
      />
    </div>
  );
};

const DynamicTimelinePage = dynamic(
  {
    loader: async () => TimelinePage,
  },
  { ssr: false }
);

export default DynamicTimelinePage;
