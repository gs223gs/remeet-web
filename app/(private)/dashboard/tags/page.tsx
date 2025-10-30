import React from "react";
import { getTags } from "./_server/server";

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
          <div key={t.id} className="outline m-5">
            {t.name}
          </div>
        );
      })}
    </div>
  );
}
