"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FiX, FiInfo, FiBell } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getNotifications } from "@/app/(app)/actions/notifications";

// Types matching Prisma Enum
type NotificationType = "POPUP" | "BANNER" | "TOAST";
type NotificationFrequency = "ONCE" | "SESSION" | "ALWAYS";

interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  position: string;
  startDate?: string;
  endDate?: string;
  frequency: NotificationFrequency;
  delay: number;
  duration: number;
}

export default function NotificationLayer() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [queue, setQueue] = useState<Notification[]>([]);
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());

  // Load seen state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("neon_seen_notifications");
    if (stored) {
      setSeenIds(new Set(JSON.parse(stored)));
    }

    // Clear session storage on new session (simplified check)
    if (!sessionStorage.getItem("neon_session_active")) {
      sessionStorage.setItem("neon_session_active", "true");
      sessionStorage.removeItem("neon_session_seen");
    }
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await getNotifications();
      if (res.success && res.notifications) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setNotifications(res.notifications as any);
      }
    };
    fetchNotes();
  }, []);

  // Process queue
  useEffect(() => {
    const processQueue = () => {
      // Filter valid notifications
      const valid = notifications.filter((n) => {
        // Check frequency
        if (n.frequency === "ONCE" && seenIds.has(n.id)) return false;
        if (n.frequency === "SESSION") {
          const sessionSeen = JSON.parse(
            sessionStorage.getItem("neon_session_seen") || "[]"
          );
          if (sessionSeen.includes(n.id)) return false;
        }
        return true;
      });

      // Sort by priority/type (Popups first, then banners, then toasts)
      // For now, just simple queue
      setQueue(valid);
    };

    if (notifications.length > 0) {
      processQueue();
    }
  }, [notifications, seenIds]);

  // Display logic
  useEffect(() => {
    if (!activeNotification && queue.length > 0) {
      const next = queue[0];

      // Handle delay
      const timer = setTimeout(() => {
        setActiveNotification(next);
        // Remove from queue to prevent re-triggering immediately
        setQueue((prev) => prev.slice(1));
      }, next.delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [queue, activeNotification]);

  const dismiss = useCallback(
    (notification: Notification) => {
      setActiveNotification(null);

      // Update persistence
      if (notification.frequency === "ONCE") {
        const newSeen = new Set(seenIds);
        newSeen.add(notification.id);
        setSeenIds(newSeen);
        localStorage.setItem(
          "neon_seen_notifications",
          JSON.stringify(Array.from(newSeen))
        );
      } else if (notification.frequency === "SESSION") {
        const sessionSeen = JSON.parse(
          sessionStorage.getItem("neon_session_seen") || "[]"
        );
        sessionSeen.push(notification.id);
        sessionStorage.setItem(
          "neon_session_seen",
          JSON.stringify(sessionSeen)
        );
      }
    },
    [seenIds]
  );
  // Auto-dismiss logic
  useEffect(() => {
    if (activeNotification && activeNotification.duration > 0) {
      const timer = setTimeout(() => {
        dismiss(activeNotification);
      }, activeNotification.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification, dismiss]);

  if (!activeNotification) return null;

  // Render based on type
  if (activeNotification.type === "POPUP") {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
          >
            <button
              onClick={() => dismiss(activeNotification)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX size={20} />
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeNotification.title}
              </h3>
              <div
                className="prose prose-blue text-gray-600"
                dangerouslySetInnerHTML={{ __html: activeNotification.content }}
              />
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  if (activeNotification.type === "BANNER") {
    const isTop = activeNotification.position.includes("top");
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: isTop ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isTop ? -100 : 100, opacity: 0 }}
          className={`fixed ${
            isTop ? "top-0" : "bottom-0"
          } left-0 right-0 z-90 bg-blue-600 text-white shadow-lg`}
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="bg-white/20 p-2 rounded-full">
                <FiInfo />
              </span>
              <div>
                <p className="font-semibold">{activeNotification.title}</p>
                <div
                  className="text-sm text-blue-100"
                  dangerouslySetInnerHTML={{
                    __html: activeNotification.content,
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => dismiss(activeNotification)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FiX />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // TOAST
  const positions: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed z-90 ${
          positions[activeNotification.position] || positions["bottom-right"]
        } max-w-sm w-full`}
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 flex items-start gap-4">
          <div className="text-blue-500 mt-1">
            <FiBell size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">
              {activeNotification.title}
            </h4>
            <div
              className="text-sm text-gray-600 mt-1"
              dangerouslySetInnerHTML={{ __html: activeNotification.content }}
            />
          </div>
          <button
            onClick={() => dismiss(activeNotification)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={16} />
          </button>
        </div>
        {activeNotification.duration > 0 && (
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: activeNotification.duration,
              ease: "linear",
            }}
            className="h-1 bg-blue-500 absolute bottom-0 left-0 rounded-b-xl"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
