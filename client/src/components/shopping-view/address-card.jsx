import {
  MapPin,
  Phone,
  StickyNote,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function AddressCard({
  address,
  isSelected,
  onEdit,
  onDelete,
  setCurrSelAddress,
}) {
  if (!address) return null;

  return (
    <div
      onClick={setCurrSelAddress ? () => setCurrSelAddress(address) : null}
      className={`relative rounded-xl p-5 shadow-md transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "border-2 border-green-500 bg-green-500/5 ring-2 ring-green-500/20"
            : "border border-zinc-800 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900"
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-black">
          <CheckCircle className="h-3.5 w-3.5" />
        </div>
      )}

      <div className="flex gap-3 border-b border-zinc-800 pb-4">
        <MapPin className="mt-1 h-5 w-5 text-zinc-400 shrink-0" />

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Address
          </p>

          <p className="font-semibold leading-snug text-white">
            {address?.address}
          </p>

          <p className="text-sm text-zinc-400">
            {address?.city} • {address?.pincode}
          </p>
        </div>
      </div>

      <div className="flex gap-3 border-b border-zinc-800 py-4">
        <Phone className="h-5 w-5 text-zinc-400 shrink-0" />

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Phone</p>

          <p className="font-medium text-white">{address?.phone}</p>
        </div>
      </div>

      {address?.notes?.trim() && (
        <div className="flex gap-3 pt-4">
          <StickyNote className="mt-1 h-5 w-5 text-zinc-400 shrink-0" />

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Notes
            </p>

            <p className="leading-relaxed text-zinc-300">{address.notes}</p>
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-end gap-3 border-t border-zinc-800 pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(address);
          }}
          className="flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(address);
          }}
          className="flex items-center gap-2 rounded-md border border-red-900 px-3 py-1.5 text-red-400 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
