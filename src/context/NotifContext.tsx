import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Notification } from "@/types";

interface NotifContextValue {
  notify: (msg: string) => void;
}

const NotifContext = createContext<NotifContextValue | null>(null);

export function NotifProvider({ children }: { children: ReactNode }) {
  const [msgs, setMsgs] = useState<Notification[]>([]);

  const notify = useCallback((msg: string) => {
    const id = Date.now();
    setMsgs((prev) => [...prev, { id, msg }]);
    setTimeout(
      () => setMsgs((prev) => prev.filter((m) => m.id !== id)),
      3000
    );
  }, []);

  return (
    <NotifContext.Provider value={{ notify }}>
      {children}

      {/* Toast stack */}
      <div className="fixed bottom-24 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        {msgs.map((m) => (
          <div
            key={m.id}
            className="animate-notif bg-ink text-turmeric text-sm font-medium
                       border-l-4 border-rust px-5 py-3 max-w-xs leading-snug"
          >
            {m.msg}
          </div>
        ))}
      </div>
    </NotifContext.Provider>
  );
}

/** Hook — call notify() from any component inside NotifProvider. */
export function useNotif(): NotifContextValue {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error("useNotif must be used inside <NotifProvider>");
  return ctx;
}
