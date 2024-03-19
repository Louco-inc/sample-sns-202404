import {
  Card,
  CardHeader,
  Icon,
  CardBody,
  CardFooter,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import {
  FaRegComment,
  FaRegHeart,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";
import PostMenu from "./PostMenu";
import Image from "next/image";
import { Post, Comment } from "@/types";
import { formattedAccountName, formattedPostTime } from "@/utils";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/state/userState";

type Props = {
  post: Post | Comment;
  isComment: boolean;
  onDelete: () => void;
  onCreateFavorite: () => void;
  onDeleteFavorite: () => void;
  openPostDetail?: () => void;
};

const PostBlock = (props: Props): JSX.Element => {
  const {
    post,
    isComment,
    onDelete,
    onCreateFavorite,
    onDeleteFavorite,
    openPostDetail,
  } = props;
  const [isOpenPostMenu, setIsOpenPostMenu] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const userInfo = useRecoilValue(userInfoSelector);
  if (!post) return <></>;
  const [isFavorite, setIsFavorite] = useState<boolean>(
    post.favorites.some((f) => f.userId === Number(userInfo.id))
  );
  const isOpenPostDetail = Boolean(openPostDetail);
  const hoverClass = `${isOpenPostDetail ? "hover:cursor-pointer" : ""}`;

  const handleFavorite = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void => {
    e.stopPropagation();
    if (isFavorite) {
      onDeleteFavorite();
    } else {
      onCreateFavorite();
    }
  };

  useEffect(() => {
    setIsFavorite(post.favorites.some((f) => f.userId === Number(userInfo.id)));
  }, [post.favorites]);

  return (
    <div key={post.id} className="flex p-4 rounded-2xl">
      <Card className={`w-full ${hoverClass}`} onClick={openPostDetail}>
        <CardHeader className="flex items-center">
          <Image
            className="my-1 mr-2"
            src="/images/profile_icon1.png"
            width={36}
            height={36}
            alt="profile_img"
          />
          <span>{post.user.nickname}</span>
          <span className="text-xs text-account-name-color mx-2">
            {formattedAccountName(post.user.email)}
          </span>
          <div className="text-xs text-account-name-color ml-4">
            {formattedPostTime(post.updatedAt)}
          </div>
          <div
            className="last:ml-auto hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenPostMenu(true);
            }}
          >
            <Icon as={BsThreeDots} w={8} h={8} />
            <div className="absolute">
              <PostMenu
                isOpenMenu={isOpenPostMenu}
                onClose={() => setIsOpenPostMenu(false)}
                onDelete={onOpen}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="ml-10 !px-5 !py-0">{post.content}</CardBody>
        <CardFooter className="ml-6">
          <Button leftIcon={<FaRegComment />} variant="ghost">
            {isComment ? 0 : post.comments.length}
          </Button>
          <Button
            leftIcon={isFavorite ? <FaHeart /> : <FaRegHeart />}
            variant="ghost"
            onClick={(
              e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
            ) => handleFavorite(e)}
          >
            {post.favorites.length}
          </Button>
          <Button leftIcon={<FaRegBookmark />} variant="ghost">
            0
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              確認
            </AlertDialogHeader>

            <AlertDialogBody>
              {`${isComment ? "コメント" : "投稿"}を削除してもよろしいでしょうか。`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default PostBlock;
