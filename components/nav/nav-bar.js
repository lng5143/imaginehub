'use client';

import Settings from "../settings/settings";

export default function NavigationBar({onClickSettings}) {
  return (
    <div className="flex h-10 px-10 py-5">
      <h1>NavigationBar</h1>
      <button className="" onClick={onClickSettings}>Settings</button>
    </div>
  );
}