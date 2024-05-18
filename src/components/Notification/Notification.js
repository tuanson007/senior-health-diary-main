import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

export function useSetReminders({ value }) {
  const isMounted = useRef(false);
  const [reminders, setReminders] = useState(value);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {}
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setReminders(value);
  }, [value]);

  useEffect(() => {
    const checkReminders = async () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const currentReminders = reminders?.[formattedDate] || [];

      for (const reminder of currentReminders) {
        const { time, text } = reminder;
        const [hours, minutesCon] = time.split(":");
        const [minutes, m] = minutesCon.split(/PM|AM/);

        const schedulingOptions = {
          hour: Number(
            minutesCon.includes("PM") ? parseInt(hours) + 12 : hours
          ),
          minute: Number(minutes),
          repeats: false,
        };

        const scheduledTime = new Date(
          year,
          currentDate.getMonth(),
          currentDate.getDate(),
          schedulingOptions.hour,
          schedulingOptions.minute
        );
        // await Notifications.scheduleNotificationAsync({
        //   content: {
        //     title: "Nhắc nhở",
        //     body: text,
        //   },
        //   trigger: scheduledTime,
        // });
        const notifications =
          await Notifications.getAllScheduledNotificationsAsync();
        const isScheduled = notifications.some(
          (notification) =>
            notification.content.title === "Nhắc nhở" &&
            notification.content.body === text
        );

        if (!isScheduled) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Nhắc nhở",
              body: text,
            },
            trigger: scheduledTime,
          });
        }
      }
    };

    const intervalId = setInterval(() => {
      checkReminders();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [reminders]);

  useEffect(() => {
    const backgroundTask = () => {
      checkReminders();
    };

    TaskManager.defineTask("backgroundTask", backgroundTask);

    return () => {
      TaskManager.unregisterAllTasksAsync();
    };
  }, [reminders]);

  return null;
}
