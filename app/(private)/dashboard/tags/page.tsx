import React from "react";
import { getTags } from "./_server/server";
import Link from "next/link";

export default async function Tags() {
  const tags = await getTags();
  if (!tags.ok)
    return (
      <p>
        {tags.error.message.map((e) => {
          return <div key={e}>{e}</div>;
        })}
      </p>
    );
  return (
    <div className="grid grid-cols-3 ">
      {tags.data.map((t) => {
        return (
          <Link
            key={t.id}
            className="outline m-5"
            href={`/dashboard/tags/${t.id}/`}
          >
            {t.name}
          </Link>
        );
      })}
    </div>
  );
}
