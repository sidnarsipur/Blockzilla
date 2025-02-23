import { Rule } from '@/lib/types';
import { ThumbsUp, ThumbsDown, Download } from 'lucide-react';

const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes)
        .toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })
        .replace(':00', ''); // Remove minutes if they are "00"
};

const generateInfoLine = (rule: Rule) => {
    return `${formatTime(rule.timeFrom)} - ${formatTime(rule.timeTo)}`;
};

export default function RuleBox({ rule }: { rule: Rule }) {
    const timeInfo = generateInfoLine(rule);

    return (
        <div>
            <div className="ml-2 mt-2 flex gap-2 text-xs text-gray-400">
                <button className="hover:text-gray-200">
                    <ThumbsUp size={14} />
                </button>
                <button className="hover:text-gray-200">
                    <ThumbsDown size={14} />
                </button>
                <button className="hover:text-gray-200">
                    <Download size={14} />
                </button>
            </div>
            <p className="mb-2 mt-6 text-center text-gray-400">
                New Rule Added
            </p>
            <div className="mx-6 rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-md transition-shadow">
                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                    {rule.name}
                </h3>
                <p className="text-sm text-gray-500">{timeInfo}</p>
                <p className="line-clamp-2 text-sm text-gray-500">
                    {rule.description}
                </p>
            </div>
        </div>
    );
}
