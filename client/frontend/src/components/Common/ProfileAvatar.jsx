import React, { useEffect, useMemo, useState } from "react";

const ProfileAvatar = ({
  user,
  sizeClass = "h-10 w-10",
  imageClassName = "object-cover",
  fallbackClassName = "bg-gradient-to-br from-[#0f4da8] to-[#0f86d9] text-white font-bold",
  altSuffix = "profile",
  showStatus = false,
  isOnline = false,
  statusClassName = "h-4 w-4 bg-green-600 rounded-full absolute right-0 top-9",
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = useMemo(() => {
    const firstInitial = user?.firstName?.[0] || "";
    const lastInitial = user?.lastName?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
  }, [user?.firstName, user?.lastName]);

  useEffect(() => {
    setImageFailed(false);
  }, [user?.profilePicture]);

  const shouldShowImage = Boolean(user?.profilePicture) && !imageFailed;

  return (
    <div className="relative inline-flex shrink-0">
      {shouldShowImage ? (
        <img
          src={user?.profilePicture}
          alt={`${user?.firstName || "User"} ${user?.lastName || ""} ${altSuffix}`}
          className={`${sizeClass} rounded-full ${imageClassName}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full flex items-center justify-center ${fallbackClassName}`}
        >
          {initials}
        </div>
      )}

      {showStatus && isOnline && <div className={statusClassName}></div>}
    </div>
  );
};

export default ProfileAvatar;