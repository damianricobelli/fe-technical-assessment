import { cx } from "class-variance-authority";
import { PlusIcon } from "lucide-react";

export const TagsBadge = ({ tags }: TagsBadge.Props) => {
  const hasMoreThanOneTag = tags.length > 1;
  const noTags = tags.length === 0;

  if (noTags) return <TagsBadgeComponent.NoTags />;

  if (hasMoreThanOneTag) return <TagsBadgeComponent.MultipleTags tags={tags} />;

  return <TagsBadgeComponent.SingleTag tag={tags[0]} />;
};

const NoTagsBadge = () => {
  return (
    <div
      className={cx(baseTagsBadgeStyle, "text-body-xs-semibold text-[#808593]")}
    >
      <PlusIcon className="size-3" />
      <span>Add Tag</span>
    </div>
  );
};

const MultipleTagsBadge = ({ tags }: { tags: TagsBadge.Tag[] }) => {
  return (
    <div className={cx(baseTagsBadgeStyle, "text-body-xs-semibold")}>
      <div className="flex items-center gap-1">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="size-2 rounded-xs"
            style={{ backgroundColor: tag.color }}
          />
        ))}
      </div>
      <span>{tags.length} tags</span>
    </div>
  );
};

const SingleTagBadge = ({ tag }: { tag: TagsBadge.Tag }) => {
  return (
    <div className={cx(baseTagsBadgeStyle, "text-body-xs-semibold")}>
      <span
        className="size-2 rounded-xs"
        style={{ backgroundColor: tag.color }}
      />
      <span className="capitalize">{tag.name}</span>
    </div>
  );
};

const TagsBadgeComponent = {
  NoTags: NoTagsBadge,
  MultipleTags: MultipleTagsBadge,
  SingleTag: SingleTagBadge,
};

const baseTagsBadgeStyle = cx(
  "inline-flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1.5 select-none"
);

namespace TagsBadge {
  export type Props = {
    tags: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  export type Tag = {
    id: string;
    name: string;
    color: string;
  };
  export type MultipleTags = {
    tags: Tag[];
  };
  export type SingleTag = {
    tag: Tag;
  };
}
