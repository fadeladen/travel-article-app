import { AvatarIcon } from "@radix-ui/react-icons";
import { UserType } from "../../../types/UserTypes";

const UserInfo = ({ data }: { data: UserType }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div>
        <AvatarIcon
          className="text-slate-400"
          height={96}
          width={96}
        />
      </div>
      <div className="text-sm mt-3">
        <p>{data?.email}</p>
        <p>{data?.username}</p>
      </div>
    </div>
  );
};

export default UserInfo;
