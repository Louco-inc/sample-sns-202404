import { Menu, MenuList, MenuItem } from "@chakra-ui/react";

type Props = {
  isOpenMenu: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
};

const PostMenu = (props: Props): JSX.Element => {
  const { isOpenMenu, onClose, onDelete, onUpdate } = props;

  return (
    <Menu isOpen={isOpenMenu} onClose={onClose}>
      <MenuList>
        <MenuItem onClick={onUpdate}>編集</MenuItem>
        <MenuItem onClick={onDelete}>削除</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
