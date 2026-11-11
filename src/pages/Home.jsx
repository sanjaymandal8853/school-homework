
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Archive,
  ClipboardList,
  BookOpen,
} from "lucide-react";

import AssignmentCard from "../components/AssignmentCard";
import WhatsAppButton from "../components/WhatsAppButton";

import {
  getAssignments,
  getActiveAssignments,
  getArchivedAssignments,
} from "../utils/storage";

export default function Home() {
  const [assignments, setAssignments] = useState(getAssignments);
  const [classFilter, setClassFilter] = useState("All Classes");
  const [search, setSearch] = useState("");
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    const refresh = () => setAssignments(getAssignments());

    window.addEventListener("homework-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("homework-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const classes = [
    "All Classes",
    ...new Set(assignments.map((item) => item.className)),
  ];

  const active = getActiveAssignments(assignments);

  const displayed = useMemo(() => {
    const list = archive
      ? getArchivedAssignments(assignments)
      : getActiveAssignments(assignments);

    return list.filter((item) => {
      const classMatch =
        classFilter === "All Classes" ||
        item.className === classFilter;

      const query = search.toLowerCase();

      const searchMatch = [
        item.title,
        item.subject,
        item.description,
        item.className,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      return classMatch && searchMatch;
    });
  }, [assignments, archive, classFilter, search]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Homepage Cover Section */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-6">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/images/cover.png"
            alt="School Homework - Stay Organized. Never Miss an Assignment."
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Student Portal Hero Section */}
      <section className="bg-indigo-600 rounded-3xl p-7 sm:p-12 text-white mt-8">
        <p className="text-indigo-100 font-semibold text-sm">
          STUDENT HOMEWORK PORTAL
        </p>

        <h2 className="text-3xl sm:text-5xl font-bold mt-4 leading-tight">
          All your homework.
          <br />
          One simple place.
        </h2>

        <p className="text-indigo-100 mt-5 max-w-xl leading-7">
          Check assignments, find due dates, and stay
          organized with your schoolwork.
        </p>

        <div className="inline-flex items-center gap-2 mt-7 bg-white/15 rounded-xl px-4 py-3">
          <ClipboardList size={20} />
          <strong>{active.length} Current Assignments</strong>
        </div>
      </section>

      {/* Assignments Section */}
      <section className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {archive ? "Homework Archive" : "Current Assignments"}
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              Find your class homework and submission dates.
            </p>
          </div>

          <button
            onClick={() => setArchive(!archive)}
            className="border border-slate-200 rounded-xl px-5 py-3 flex items-center justify-center gap-2 hover:bg-white"
          >
            <Archive size={18} />
            {archive ? "Current Homework" : "View Archive"}
          </button>
        </div>

        {/* Search and Class Filter */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={19}
            />

            <input
              type="search"
              aria-label="Search homework"
              placeholder="Search homework or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            aria-label="Select class"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {classes.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Assignment Cards */}
        <div className="mt-7">
          {displayed.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((item) => (
                <AssignmentCard
                  key={item.id}
                  assignment={item}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-14 text-center">
              <BookOpen
                className="mx-auto text-slate-300"
                size={42}
              />

              <h3 className="font-bold text-xl mt-4">
                No assignments found
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Try another search or select a different class.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-slate-400 mt-16">
        © {new Date().getFullYear()} SchoolDesk. All rights reserved.
      </footer>

      {/* WhatsApp Contact Button */}
      <WhatsAppButton />

    </main>
  );
}
