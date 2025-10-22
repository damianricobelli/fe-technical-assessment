import { cx } from "class-variance-authority";
import React from "react";

const Root = ({ children }: Layout.Root) => {
  return (
    <div
      className={cx(
        "grid [grid-template-areas:'sidebar_header'_'sidebar_content']",
        "grid-cols-[auto_1fr] grid-rows-[auto_1fr]",
        "min-h-screen"
      )}
    >
      {children}
    </div>
  );
};

const Sidebar = ({ children }: Layout.Sidebar) => {
  return (
    <aside
      className={cx(
        "[grid-area:sidebar] flex flex-col gap-2",
        "border-r-2 border-border p-4",
        "min-w-64 w-full"
      )}
    >
      {children}
    </aside>
  );
};

const Header = ({ children }: Layout.Header) => {
  return (
    <header className="[grid-area:header] flex justify-between items-center p-4 border-b border-border">
      {children}
    </header>
  );
};

const Content = ({ children }: Layout.Content) => {
  return <main className="[grid-area:content] p-4">{children}</main>;
};

export const Layout = {
  Root,
  Sidebar,
  Header,
  Content,
};

namespace Layout {
  export type Root = {
    children: React.ReactNode;
  };
  export type Sidebar = {
    children: React.ReactNode;
  };
  export type Header = {
    children: React.ReactNode;
  };
  export type Content = {
    children: React.ReactNode;
  };
}
