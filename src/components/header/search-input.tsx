import { cx } from "class-variance-authority";
import { SearchIcon } from "lucide-react";
import React from "react";

/**
 * Get the initial search query from the URL search params
 * This is useful if the user refreshes the page or comes back to the page after a while
 * @returns The initial search query
 */
const getInitialSearchQuery = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get("q") || "";
};

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = React.useState(getInitialSearchQuery);
  const debouncedQuery = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    const url = new URL(window.location.href);

    if (debouncedQuery === "") {
      url.searchParams.delete("q");
      window.history.pushState({}, "", url.toString());
      return;
    }

    url.searchParams.set("q", debouncedQuery);
    window.history.pushState({}, "", url.toString());
  }, [debouncedQuery]);

  return (
    <div className="relative w-full">
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="search"
        placeholder="Search workflows"
        className={cx(
          "w-full pl-7 text-sm appearance-none outline-none",
          "px-2 py-1 rounded-md border border-black/15",
          "shadow-sm focus:ring-2 focus:ring-blue",
          "text-body-xs-regular placeholder:text-tertiary"
        )}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
