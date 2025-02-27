import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { familyRole, genders } from '@/jsondata/global.json';

export default function ProfilePage() {
  const user = useAppSelector(userData);
  return (
    <div>
      <img src={user?.profile ?? ""} alt="" />
      <p>email: {user?.email}</p>
      <p>firstname: {user?.fName}</p>
      <p>lastname: {user?.lName}</p>
      <p>gender: {genders.find(a => a.id === user?.gender.toString())?.name}</p>
      <p>roleId: {familyRole.find(a => a.id === user?.roleId.toString())?.name}</p>
    </div>
  );
}
