import Header from "@/components/header";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from "@chakra-ui/react";
import { FcTimeline } from "react-icons/fc";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { MdNotificationsNone, MdMailOutline } from "react-icons/md";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { userInfoSelector } from "@/state/userState";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";

const TimelinePage = (): JSX.Element => {
  const [timelineData, setTimelineData] = useState<Post[]>([]);
  const userInfo = useRecoilValue(userInfoSelector);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const timelineData: Post[] = await fetch("/api/posts").then(
        async (r) => await r.json()
      );
      setTimelineData(timelineData);
    };
    init();
  }, []);

  const formattedAccountName = (email: string): string => {
    return `@${email.split("@")[0]}`;
  };

  const openPostModal = (): void => {};

  return (
    <div>
      <Header />
      <div className="flex bg-main-color">
        <div className="w-1/4">
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
            <Button className="!bg-post-color mt-8" variant="solid" onClick={openPostModal}>
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
        <div className="w-3/4">
          {timelineData.map((post) => {
            return (
              <div key={post.id} className="flex p-4 rounded-2xl">
                <Card className="w-full">
                  <CardHeader className="flex">
                    <Image
                      className="my-1"
                      src="/images/profile_icon1.png"
                      width={36}
                      height={36}
                      alt="profile_img"
                    />
                    <div className="ml-2 flex flex-col">
                      <span>{post.user.nickname}</span>
                      <span className="text-xs text-account-name-color">
                        {formattedAccountName(post.user.email)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardBody className="ml-10 !px-5 !py-0">
                    {post.content}
                  </CardBody>
                  <CardFooter className="ml-6">
                    <Button leftIcon={<FaRegComment />} variant="ghost">
                      {post.comments.length}
                    </Button>
                    <Button leftIcon={<FaRegHeart />} variant="ghost">
                      {post.favorites.length}
                    </Button>
                    <Button leftIcon={<FaRegBookmark />} variant="ghost">
                      0
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
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
