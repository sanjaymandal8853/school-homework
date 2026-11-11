
import {
  CalendarDays,
  UserRound,
  MessageCircle,
  BookOpen,
} from "lucide-react";

import { formatDate } from "../utils/storage";
import { shareAssignment } from "../utils/whatsapp";

export default function AssignmentCard({ assignment }) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition">
      <div className="flex items-center justify-between gap-2">
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full">
          {assignment.subject}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          {assignment.className}
        </span>
      </div>

      <h3 className="text-xl font-bold mt-5">
        {assignment.title}
      </h3>

      <p className="text-slate-500 text-sm leading-6 mt-2">
        {assignment.description}
      </p>

      <div className="border-t border-slate-100 mt-5 pt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={18} className="text-indigo-600" />
          <span>
            Due: <strong>{formatDate(assignment.dueDate)}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <UserRound size={18} />
          {assignment.teacher || "School Teacher"}
        </div>
      </div>

      <button
        onClick={() => shareAssignment(assignment)}
        className="w-full mt-5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-xl py-3 flex justify-center items-center gap-2"
      >
        <MessageCircle size={18} />
        Share on WhatsApp
      </button>
    </article>
  );
}
