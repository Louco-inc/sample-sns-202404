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
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import PostMenu from "./PostMenu";
import Image from "next/image";
import { Post } from "@/types";
import { formattedAccountName, formattedPostTime } from "@/utils";
import { useRef, useState } from "react";

type Props = {
  post: Post;
  onDelete: () => void;
};

const PostBlock = (props: Props): JSX.Element => {
  const { post, onDelete } = props;
  const [isOpenPostMenu, setIsOpenPostMenu] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <div key={post.id} className="flex p-4 rounded-2xl">
      <Card className="w-full">
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
          <div className="last:ml-auto" onClick={() => setIsOpenPostMenu(true)}>
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
              投稿を削除してもよろしいでしょうか。
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
