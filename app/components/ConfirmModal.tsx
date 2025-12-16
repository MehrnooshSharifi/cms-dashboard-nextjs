"use client";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title = "آیا مطمئن هستید؟",
  message = "این عملیات قابل بازگشت نیست.",
  confirmText = "تایید",
  cancelText = "انصراف",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl animate-fade h-[100px]">
        <h2 className="text-lg font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-5">{message}</p>

        <div className="flex justify-end gap-3 w-[350px]">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 w-[50px] cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 w-[50px] cursor-pointer"
          >
            {loading ? "در حال حذف..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
