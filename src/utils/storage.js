
const KEY = "school_homework";

const initialAssignments = [
  {
    id: "1",
    title: "Algebra Exercise 5",
    subject: "Mathematics",
    className: "Class 10",
    teacher: "Mr. Sharma",
    description: "Complete questions 1 to 15 from Exercise 5.",
    dueDate: "2026-11-15",
  },
  {
    id: "2",
    title: "English Essay",
    subject: "English",
    className: "Class 10",
    teacher: "Mrs. Verma",
    description: "Write an essay on Environmental Protection.",
    dueDate: "2026-11-18",
  },
  {
    id: "3",
    title: "Human Digestive System",
    subject: "Science",
    className: "Class 9",
    teacher: "Mr. Kumar",
    description: "Draw and label the human digestive system.",
    dueDate: "2026-11-20",
  },
];

export function getAssignments() {
  const saved = localStorage.getItem(KEY);

  if (saved === null) {
    localStorage.setItem(KEY, JSON.stringify(initialAssignments));
    return initialAssignments;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAssignments(assignments) {
  localStorage.setItem(KEY, JSON.stringify(assignments));

  // Update React pages open in the same browser tab.
  window.dispatchEvent(new Event("homework-updated"));
}

export function isExpired(dueDate) {
  if (!dueDate) return true;

  const deadline = new Date(`${dueDate}T23:59:59`);
  return Number.isNaN(deadline.getTime()) ||
    deadline.getTime() < Date.now();
}

export function getActiveAssignments(assignments) {
  return assignments
    .filter((item) => !isExpired(item.dueDate))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getArchivedAssignments(assignments) {
  return assignments
    .filter((item) => isExpired(item.dueDate))
    .sort((a, b) => b.dueDate.localeCompare(a.dueDate));
}

export function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
