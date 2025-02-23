import { AlertCircle, Clock, Unlock } from 'lucide-react';
import { FC } from 'react';

interface CountCardProps {
    icon: FC;
    title: string;
    count: number;
}

interface AlertItemProps {
    type: string;
    message: string;
}

export default function Alerts() {
    return (
        <div className="flex h-full flex-col items-center overflow-hidden p-6 text-center">
            <h1 className="mb-2 text-3xl font-bold">
                Your <span className="text-blue-600">Alerts</span>
            </h1>
            <p className="mb-6 text-gray-600">
                Monitor online activities and requests.
            </p>

            <div className="mb-6 grid w-full max-w-md grid-cols-3 gap-4">
                <CountCard icon={AlertCircle} title="Alerts" count={5} />
                <CountCard icon={Clock} title="Time Online" count={42} />
                <CountCard icon={Unlock} title="Unblock Requests" count={8} />
            </div>

            <div className="w-full max-w-md overflow-y-auto">
                <h2 className="mb-2 text-lg font-semibold">Recent Activity</h2>
                <ul className="space-y-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <AlertItem
                            key={index}
                            type="Dangerous Site"
                            message="Attempted access to phishing site."
                        />
                    ))}
                    {Array.from({ length: 5 }).map((_, index) => (
                        <AlertItem
                            key={index + 10}
                            type="Unblock Request"
                            message="Request to unblock YouTube."
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

const CountCard: FC<CountCardProps> = ({ icon: Icon, title, count }) => {
    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-gray-100 p-4 shadow-sm transition">
            <Icon className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xl font-bold text-gray-700">{count}</p>
        </div>
    );
};

const AlertItem: FC<AlertItemProps> = ({ type, message }) => {
    return (
        <div className="flex flex-col items-start rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-md font-semibold text-red-600">{type}</h3>
            <p className="text-sm text-gray-600">{message}</p>
        </div>
    );
};
