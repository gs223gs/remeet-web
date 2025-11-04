import Link from "next/link";
import React from "react";

import { getTagsWithRanking } from "@/app/(private)/dashboard/tags/_server/server";

export default async function Tags() {
  const tags = await getTagsWithRanking();
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
            href={`/dashboard/tags/${t.id}`}
          >
            {t.name}
            <p>人数{t.count}</p>
          </Link>
        );
      })}
    </div>
  );
}
