import { useState } from 'react';
import { MapPin, User, Calendar, UserCheck, ImageOff } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import Select from '../common/Select.jsx';
import Button from '../common/Button.jsx';
import { COMPLAINT_STATUS } from '../../utils/constants.js';
import { formatDate } from '../../utils/format.js';
import { complaintService } from '../../services/complaintService.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function ComplaintDetails({ complaint, onClose, onUpdated, readOnly = false }) {
  const toast = useToast();
  const [status, setStatus] = useState(complaint?.status);
  const [saving, setSaving] = useState(false);

  if (!complaint) return null;

  async function handleUpdateStatus() {
    setSaving(true);
    try {
      await complaintService.updateStatus(complaint.id, status);
      toast.success(`Complaint ${complaint.id} marked as ${status}.`);
      onUpdated?.({ ...complaint, status });
    } catch (err) {
      toast.error(err.message || 'Unable to update status.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={!!complaint} onClose={onClose} title={`Complaint ${complaint.id}`} size="lg">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-navy-900">{complaint.type}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin size={14} /> {complaint.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge label={complaint.priority} />
            <Badge label={complaint.status} />
          </div>
        </div>

        <p className="text-sm text-navy-700 leading-relaxed">{complaint.description}</p>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Images</p>
          {complaint.images && complaint.images.length > 0 ? (
            <div className="flex gap-2">
              {complaint.images.map((src, i) => (
                <img key={i} src={src} alt="" className="w-20 h-20 rounded-lg object-cover border border-surface-200" />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-400 border border-dashed border-surface-200 rounded-lg px-3 py-4 justify-center">
              <ImageOff size={16} /> No images attached
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Field icon={User} label="Reported By" value={complaint.reportedBy} />
          <Field icon={Calendar} label="Created" value={formatDate(complaint.date)} />
          <Field icon={UserCheck} label="Assigned Officer" value={complaint.assignedOfficer || 'Unassigned'} />
        </div>

        {complaint.timeline && complaint.timeline.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Timeline</p>
            <ol className="flex flex-col gap-3 border-l-2 border-surface-200 pl-4 ml-1">
              {complaint.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-royal-500" />
                  <p className="text-sm font-medium text-navy-800">{t.label}</p>
                  <p className="text-xs text-slate-400">{formatDate(t.time, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {!readOnly && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 pt-2 border-t border-surface-200">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
                Update Status
              </label>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                {COMPLAINT_STATUS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <Button onClick={handleUpdateStatus} loading={saving} disabled={status === complaint.status}>
              Save Status
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="text-slate-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-navy-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
