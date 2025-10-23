import { cx } from "class-variance-authority";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";

type Sort = "asc" | "desc";

const DEFAULT_SORT: Sort = "desc";

/**
 * Get the initial sort from the URL search params
 * This is useful if the user refreshes the page or comes back to the page after a while
 * @returns The initial sort
 */
const getInitialSort = () => {
  const url = new URL(window.location.href);
  const param = url.searchParams.get("sort");
  return param as Sort;
};

// The idea of using query params was not necessary for the challenge,
// but I thought it would be good to add this detail as part of my ideas
// on how to handle this kind of situation on a dashboard app with filters
export const SortSelect = () => {
  const [sort, setSort] = React.useState(getInitialSort);

  React.useEffect(() => {
    if (!sort) return;
    const url = new URL(window.location.href);
    url.searchParams.set("sort", sort);
    window.history.pushState({}, "", url.toString());
  }, [sort]);

  return (
    <label
      className={cx(
        "relative flex items-center justify-between",
        "w-fit px-2 py-1 rounded-md border border-border",
        "text-body-sm-semibold cursor-pointer",
        "focus-within:ring-2 focus-within:ring-blue appearance-none outline-none"
      )}
    >
      <span className="mr-1 select-none">Sort</span>

      <span className="select-none">
        {sort === "asc" ? (
          <ArrowUpIcon className="size-3.5" />
        ) : (
          <ArrowDownIcon className="size-3.5" />
        )}
      </span>

      <select
        className="absolute inset-0 opacity-0 cursor-pointer"
        defaultValue={DEFAULT_SORT}
        onChange={(e) => setSort(e.target.value as Sort)}
      >
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
    </label>
  );
};
