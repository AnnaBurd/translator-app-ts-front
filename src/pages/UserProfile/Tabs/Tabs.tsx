import { motion } from "framer-motion";

export interface Tab {
  label: string;
  title: string;
}

type TabsProps = {
  initialTabs: Tab[];
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
};

const Tabs: React.FC<TabsProps> = ({
  initialTabs,
  selectedTab,
  onSelectTab,
}) => {
  return (
    <div className="border-b border-slate-100 dark:border-slate-700">
      <nav aria-label="Tabs">
        <ul className="flex gap-6">
          {initialTabs.map((tab, index) => (
            <li
              key={tab.label}
              onClick={() => onSelectTab(tab)}
              className={`relative cursor-pointer pb-2 text-sm font-medium  hover:text-slate-700 ${
                tab === selectedTab ? "text-slate-700" : "text-slate-500"
              } ${index === 0 ? "pl-0 pr-1.5" : "px-1.5"}}`}
              aria-current="page"
            >
              {tab.title}
              {tab === selectedTab ? (
                <motion.div
                  className="absolute -bottom-[1px] left-0 h-[2px] w-full rounded-xl bg-indigo-400"
                  layoutId="underline"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Tabs;
