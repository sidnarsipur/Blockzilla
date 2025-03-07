//@ts-nocheck

import { ShieldCheck, Globe, EyeOff, MessageSquare } from 'lucide-react';
import { FC } from 'react';

interface FeatureCardProps {
    icon: FC;
    title: string;
    description: string;
}

export default function IntroCard() {
    return (
        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <h1 className="mb-2 text-3xl font-bold">
                Welcome to <span className="text-blue-600">Blockzilla</span>
            </h1>
            <p className="mb-6 text-gray-600">
                What can I help you with today?
            </p>

            <div className="grid w-full max-w-md grid-cols-2 gap-4">
                <FeatureCard
                    icon={ShieldCheck}
                    title="Block Websites"
                    description="Block unsafe or distracting sites"
                />
                <FeatureCard
                    icon={Globe}
                    title="Safe Browsing"
                    description="Find kid-friendly websites"
                />
                <FeatureCard
                    icon={EyeOff}
                    title="Monitor Access"
                    description="Monitor and manage online access"
                />
                <FeatureCard
                    icon={MessageSquare}
                    title="AI Assistance"
                    description="Get online safety tips and tricks"
                />
            </div>
        </div>
    );
}

const FeatureCard: FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-gray-100 p-4 shadow-sm transition">
            <Icon className="h-8 w-8 text-blue-600" />
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};
