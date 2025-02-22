import { MessageCircle, BarChart, Settings, Siren, Laptop } from 'lucide-react';
import { JSX, useState } from 'react';
import clsx from 'clsx';
import StatPage from './pages/Stat';
import ChatPage from './pages/Chat';
import SettingsPage from './pages/Settings';

type Tab = {
    name: string;
    path: string;
    icon: JSX.Element;
    page: JSX.Element;
};

const tabs: Tab[] = [
    {
        name: 'Rules',
        path: '/stat',
        icon: <BarChart size={24} />,
        page: <StatPage />,
    },
    {
        name: 'Chat',
        path: '/chat',
        icon: <MessageCircle size={24} />,
        page: <ChatPage />,
    },
    {
        name: 'Devices',
        path: '/settings',
        icon: <Laptop size={24} />,
        page: <SettingsPage />,
    },
    {
        name: 'Alerts',
        path: '/settings',
        icon: <Siren size={24} />,
        page: <SettingsPage />,
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: <Settings size={24} />,
        page: <SettingsPage />,
    },
];

export default function BottomTabNavigation() {
    const [tabIdx, setTabIdx] = useState(1);
    return (
        <div className="flex h-full w-full flex-col">
            {tabs[tabIdx].page}
            <nav className="mt-auto flex w-full justify-around border-t bg-white py-2 shadow-md">
                {tabs.map((tab, idx) => (
                    <div
                        key={idx}
                        onClick={() => setTabIdx(idx)}
                        className={clsx(
                            'duration-20 flex flex-col items-center p-2 text-sm transition-colors',
                            tabIdx === idx ? 'text-blue-600' : 'text-gray-500'
                        )}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
}
