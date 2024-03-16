import Header from "@/components/header";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { FcTimeline } from "react-icons/fc";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { MdNotificationsNone, MdMailOutline } from "react-icons/md";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";

export default function TimelinePage(): JSX.Element {
  const [timelineData, setTimelineData] = useState<Post[]>([]);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const timelineData: Post[] = await fetch("/api/posts").then(
        async (r) => await r.json()
      );
      console.log(timelineData);
      setTimelineData(timelineData);
    };
    init();
  }, []);

	const formattedAccountName = (email: string): string => {
		return `@${email.split('@')[0]}`
	}

  return (
    <div>
      <Header />
      <div className="flex bg-main-color">
        <div className="w-1/4">
          <div className="flex flex-col">
            <Button leftIcon={<FcTimeline />} variant="ghost">
              タイムライン
            </Button>
            <Button leftIcon={<FaSearch />} variant="ghost">
              検索
            </Button>
            <Button leftIcon={<MdNotificationsNone />} variant="ghost">
              通知
            </Button>
            <Button leftIcon={<MdMailOutline />} variant="ghost">
              メッセージ
            </Button>
            <Button leftIcon={<FaRegBookmark />} variant="ghost">
              ブックマーク
            </Button>
          </div>
          <div>
            <div>ログインアカウント</div>
          </div>
        </div>
        <div className="w-3/4">
          {timelineData.map((post) => {
            return (
              <div key={post.id} className="flex p-6 rounded-2xl">
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
											<span className="text-xs text-account-name-color">{formattedAccountName(post.user.email)}</span>
										</div>
                  </CardHeader>
                  <CardBody className="ml-10">{post.content}</CardBody>
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
}
