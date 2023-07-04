import { Box, Image, Input, Text } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { IUser } from "../../../types/index.types";
import { UserListItem } from "../UserListItem/UsersList";
import { getAsyncUsers } from "./HttpHookForGetUsers/http.hook";
import Polygon from "./images/Polygon.svg";

export const ChatPanel = () => {
  const nav = useNavigate();
  const [getUsers, setUsers] = createSignal<IUser[]>([]);

  async function usersHandler(): Promise<void> {
    const users = await getAsyncUsers();
    setUsers(users);
  };

  return (
    <Box
      width={310}
      height={'100vh'}
      backgroundColor={'#252838'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Box display={'flex'} justifyContent={'flex-end'} width={'100%'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={80}
          marginTop={21}
          marginRight={20}
          cursor={'pointer'}
          onClick={() => nav('/profile')}
        >
          <Box color={'#9898B0'} fontSize={19} textAlign={'right'}>Profile</Box>
          <Image src={Polygon} width={13} height={13} marginTop={3} />
        </Box>
      </Box>
      <Input
        placeholder={'Search'}
        width={'90%'}
        marginTop={23}
        backgroundColor={'#343A4F'}
        borderColor={'#343A4F'}
        color={'white'}
        onClick={usersHandler}
      />
      <Box width={'100%'} marginTop={20}>
        <For each={getUsers()}>{
          user =>
            <UserListItem id={user.id} username={user.username} />}</For>
      </Box>
    </Box>
  )
}
