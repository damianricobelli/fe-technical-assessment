import { cx } from "class-variance-authority";
import { ChartNoAxesColumn, DatabaseIcon, Settings } from "lucide-react";

const menuItems = [
  {
    label: "Data Name",
    icon: <DatabaseIcon className="size-3" />,
    href: "/",
  },
  {
    label: "Monitoring",
    icon: <ChartNoAxesColumn className="size-3" />,
    href: "/monitoring",
  },
  {
    label: "Settings",
    icon: <Settings className="size-3" />,
    href: "/settings",
  },
];

export const Menu = () => {
  return (
    <nav>
      <ul className="flex flex-col py-2">
        {menuItems.map((item) => (
          <li key={item.href} className="py-1.5 focus:ring-2 focus:ring-blue">
            <a
              href={item.href}
              className={cx(
                "flex items-center gap-2 w-full",
                "text-menu-item-medium"
              )}
            >
              {item.icon} {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
