/* eslint-disable react-refresh/only-export-components -- provider va uning hooki bitta faylda turadi (§8) */
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { createContext, ReactNode, useContext } from 'react';

type NotifyFn = (args: ArgsProps) => void;

interface INotificationContextData {
    notify: {
        success: NotifyFn;
        error: NotifyFn;
        info: NotifyFn;
        warning: NotifyFn;
    };
}

const NotificationContext = createContext<INotificationContextData | null>(null);

export const useNotify = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotify must be used within a NotificationProvider');
    return ctx.notify;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [api, contextHolder] = notification.useNotification();

    const defaults: Partial<ArgsProps> = {
        placement: 'bottomRight',
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
    };

    const notify = {
        success: (args: ArgsProps) => api.success({ ...defaults, ...args }),
        error: (args: ArgsProps) => api.error({ ...defaults, ...args }),
        info: (args: ArgsProps) => api.info({ ...defaults, ...args }),
        warning: (args: ArgsProps) => api.warning({ ...defaults, ...args }),
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
