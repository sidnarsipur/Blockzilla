import { Tablet, Laptop } from 'lucide-react';
import { FC } from 'react';

interface DeviceCardProps {
    icon: FC;
    name: string;
    status: string;
}

export default function Devices() {
    return (
        <div className="flex h-full flex-col items-center p-6 text-center">
            <h1 className="mb-2 text-3xl font-bold">
                Your <span className="text-blue-600">Devices</span>
            </h1>
            <p className="mb-6 text-gray-600">
                Manage and monitor your connected devices.
            </p>

            <div className="grid w-full max-w-md grid-cols-1 gap-4">
                <DeviceCard
                    icon={Tablet}
                    name="Sid's iPad Pro"
                    status="Active"
                />
                <DeviceCard
                    icon={Laptop}
                    name="Sally's MacBook Air"
                    status="Offline"
                />
            </div>
        </div>
    );
}

const DeviceCard: FC<DeviceCardProps> = ({ icon: Icon, name, status }) => {
    return (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-gray-100 p-4 shadow-sm transition">
            <Icon className="h-8 w-8 text-blue-600" />
            <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p
                    className={`text-sm ${status === 'Active' ? 'text-green-600' : 'text-red-500'}`}
                >
                    {status}
                </p>
            </div>
        </div>
    );
};
