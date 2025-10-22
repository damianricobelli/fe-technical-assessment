import { cx } from "class-variance-authority";
import { PlusIcon } from "lucide-react";

export const TagsBadge = ({ tags }: TagsBadge.Props) => {
  const hasMoreThanOneTag = tags.length > 1;
  const noTags = tags.length === 0;

  if (noTags) {
    return (
      <div
        className={cx(
          baseTagsBadgeStyle,
          "text-body-xs-semibold text-[#808593]"
        )}
      >
        <PlusIcon className="size-3" />
        <span>Add Tag</span>
      </div>
    );
  }

  if (hasMoreThanOneTag) {
    return (
      <div className={cx(baseTagsBadgeStyle, "text-body-xs-semibold")}>
        <div className="flex items-center gap-1">
          {tags.map((tag, index) => (
            <span
              key={tag.id}
              className={cx(
                "size-2 rounded-xs",
                index === 0 ? "bg-blue" : "bg-lilac"
              )}
            />
          ))}
        </div>
        <span>{tags.length} tags</span>
      </div>
    );
  }

  return (
    <div className={cx(baseTagsBadgeStyle, "text-body-xs-semibold")}>
      <span className="size-2 rounded-xs bg-blue" />
      <span>{tags[0].name}</span>
    </div>
  );
};

const baseTagsBadgeStyle = cx(
  "inline-flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1.5 select-none"
);

namespace TagsBadge {
  export type Props = {
    tags: {
      id: string;
      name: string;
    }[];
  };
}
