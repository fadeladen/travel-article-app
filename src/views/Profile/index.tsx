import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { CommentType } from "../../types/ArticleTypes";
import toast from "react-hot-toast";
import { apiGetComments } from "../../services/CommentService";
import UserInfo from "./components/UserInfo";
import LatestComment from "./components/LatestComment";

const ProfilePage = () => {
  const { user } = useAuth();
  const [latestComments, setLatestComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLatestCommennts = async () => {
      try {
        const resp = await apiGetComments({
          page: 1,
          pageSize: 5,
          userId: user?.documentId,
          populateArticle: true,
        });
        setLatestComments(resp?.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error?.message || "Error saving data article"
        );
      } finally {
        setLoading(false);
      }
    };
    getLatestCommennts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold pb-3 border-b">Profile</h1>
      <div className="flex flex-col md:flex-row mt-10 bg-white p-8 rounded-x flex-1">
        <div className="basis-1/4">
          <UserInfo data={user} />
        </div>
        <div className="basis-3/4">
          <LatestComment
            data={latestComments}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
