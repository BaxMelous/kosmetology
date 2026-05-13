"use client";

import { useConsultationModal } from "@/components/ConsultationModal";

export function OpenModalButton({ className }: { className?: string }) {
  const { openModal } = useConsultationModal();

  return (
    <button onClick={openModal} className={className}>
      Записаться
    </button>
  );
}
