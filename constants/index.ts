import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

export type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  isChecked?: boolean;
};

export const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities: Status[] = [
  {
    value: "HIGH",
    label: "HIGH",
    icon: HelpCircle,
  },

  {
    value: "MEDIUM",
    label: "MEDIUM",
    icon: HelpCircle,
  },

  {
    value: "LOW",
    label: "LOW",
    icon: HelpCircle,
  },
];
