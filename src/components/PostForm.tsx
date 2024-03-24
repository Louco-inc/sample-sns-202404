import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { Post, Comment } from "@/types";

type Props = {
  isOpenModal: boolean;
  editingPost?: Post | Comment;
  onClose: () => void;
  postForm: (content: string) => void;
};

const PostForm = (props: Props): JSX.Element => {
  const { isOpenModal, editingPost, onClose, postForm } = props;
  const [contentValue, setContentValue] = useState<string>(
    editingPost?.content ?? ""
  );
  const isEdit = Boolean(editingPost);

  const postFormContent = (): void => {
    if (!contentValue) {
      return;
    }
    postForm(contentValue);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton className="!left-5" />
          <ModalBody>
            <div className="flex mt-8">
              <div className="mr-4">
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
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              className="!bg-post-color !text-white"
              variant="solid"
              onClick={postFormContent}
            >
              {`${isEdit ? "更新" : "投稿"}する`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default PostForm;
