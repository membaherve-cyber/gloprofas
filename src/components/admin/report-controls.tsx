"use client";

import { useActionState } from "react";
import { addReportNote, updateReportStatus } from "@/actions/admin";
import { initialFormState } from "@/lib/form-state";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

const statuses = ["new", "under-review", "info-required", "reviewed", "closed"];

export function ReportControls({
  locale,
  dict,
  reportId,
  currentStatus,
}: {
  locale: Locale;
  dict: Dictionary;
  reportId: number;
  currentStatus: string;
}) {
  const [statusState, statusAction, statusPending] = useActionState(updateReportStatus.bind(null, locale), initialFormState);
  const [noteState, noteAction, notePending] = useActionState(addReportNote.bind(null, locale), initialFormState);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form action={statusAction} className="rounded-sm border border-line-200 bg-white p-4">
        <input type="hidden" name="reportId" value={reportId} />
        <label htmlFor={`status-${reportId}`} className="label">
          {dict.admin.updateStatus}
        </label>
        <select id={`status-${reportId}`} name="status" defaultValue={currentStatus} className="field">
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button type="submit" disabled={statusPending} className="btn btn-primary btn-sm mt-3">
          {statusPending ? dict.common.sending : dict.admin.updateStatus}
        </button>
        {statusState.status !== "idle" ? (
          <p className="mt-2 text-[0.78rem] font-medium text-slate-600" role="status">
            {statusState.message}
          </p>
        ) : null}
      </form>
      <form action={noteAction} className="rounded-sm border border-line-200 bg-white p-4">
        <input type="hidden" name="reportId" value={reportId} />
        <label htmlFor={`note-${reportId}`} className="label">
          {dict.admin.note}
        </label>
        <textarea id={`note-${reportId}`} name="note" rows={3} className="field" placeholder={dict.admin.note} />
        <button type="submit" disabled={notePending} className="btn btn-outline btn-sm mt-3">
          {notePending ? dict.common.sending : dict.admin.addNote}
        </button>
        {noteState.status !== "idle" ? (
          <p className="mt-2 text-[0.78rem] font-medium text-slate-600" role="status">
            {noteState.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
