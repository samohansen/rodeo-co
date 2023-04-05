import type { User } from "@prisma/client";
import axios from 'axios';
import { useRouter, usePathname }  from 'next/navigation';
import EditProfileModal from "./EditProfileModal";
import { signOut } from "next-auth/react";

export type ProfileModel = {
  name: string;
  birthdate?: Date;
}

type Props = {
  onClose?: () => void;
  user: User;
}

const EditProfileInterface: React.FC<Props> = ({user, onClose}) => {
  const data = user;

  const defaultValues = {
    name: data?.name || '',
    birthdate: data?.birthdate || null,
  }

  const router = useRouter();
  const path = usePathname();
  const handleSubmit = async (data: ProfileModel) => {
    const res = await axios.patch(`api/auth/account`, data);
    const {user, token} = res.data;
    // // sign in again to force refresh of session after change to user
    // await signIn('direct_jwt', {
    //   token: token,
    //   user: user,
    //   // callbackUrl: '/account'
    //   redirect: false,
    // })
    // router.replace(path)
    signOut()
  }

  return (
    <EditProfileModal defaultValues={defaultValues} onSubmit={handleSubmit} onClose={onClose}/>
  )
};

export default EditProfileInterface;
