import { useState, useEffect } from "react";
import useProfile from "./useProfile";

export default function useImage() {
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, loading: profileLoading } = useProfile();

  useEffect(() => {
    if (user?.image) {
      setLoading(true);
      setUserImage(user.image);
      setLoading(false);
    }
  }, [profileLoading]);

  return { userImage, setUserImage, loading };
}
