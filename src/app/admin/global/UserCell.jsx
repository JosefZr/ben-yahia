import React from "react";
import { User, Link } from "@nextui-org/react";

const UserCell = ({ user }) => (
  <User
    className="font-semibold leading-6 text-2xl"
    name={`${user.name} ${user.family_name}`}
    avatar={user.avatar}
    size="md"
    description={
      <Link href={`mailto:${user.email}`} size="md" isExternal className="text-light-green font-semibold">
        {user.email}
      </Link>
    }
  />
);

export default UserCell;
