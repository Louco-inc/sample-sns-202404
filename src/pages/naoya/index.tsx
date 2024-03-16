import Header from "@/components/header";
import { Button } from "@chakra-ui/react";
import { FcTimeline } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";

export default function TimelinePage(): JSX.Element {
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
        <div className="w-3/4"></div>
      </div>
    </div>
  );
}
