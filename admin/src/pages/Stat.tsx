import { useEffect, useState } from 'react';
import {
    DeleteRule,
    GetRules,
    GetBlockedWordsByRule,
    UpdateEnabledRule,
} from '../lib/admin/data';
import { Rule } from '../lib/util/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faClock } from '@fortawesome/free-solid-svg-icons';

interface TimeWindow {
    startTime: string;
    endTime: string;
    days: string[];
}

export default function Stat() {
    const [rules, setRules] = useState<Rule[]>([]);
    const [blockedWords, setBlockedWords] = useState<string[]>([]);
    const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
    const [showTimeWindow, setShowTimeWindow] = useState<string | null>(null);
    const [timeWindows, setTimeWindows] = useState<{
        [key: string]: TimeWindow;
    }>({});

    const daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    useEffect(() => {
        async function fetchRules() {
            const fetchedRules = await GetRules();
            setRules(fetchedRules);

            // Initialize time windows using timeTo and timeFrom from the rules
            const initialTimeWindows = fetchedRules.reduce(
                (acc, rule) => ({
                    ...acc,
                    [rule.id]: {
                        startTime: rule.timeFrom || '09:00',
                        endTime: rule.timeTo || '17:00',
                        days: rule.days || [],
                    },
                }),
                {}
            );
            setTimeWindows(initialTimeWindows);
        }

        fetchRules();
    }, []);

    const handleEdit = async (rule: Rule) => {
        if (selectedRule?.id === rule.id) {
            setSelectedRule(null);
            setBlockedWords([]);
        } else {
            const words = await GetBlockedWordsByRule(rule.id);
            setBlockedWords(words);
            setSelectedRule(rule);
        }
    };

    const handleDelete = async (rule: Rule) => {
        await DeleteRule(rule.id);
        setRules((prevRules) => prevRules.filter((r) => r.id !== rule.id));
    };

    const handleToggle = async (rule: Rule) => {
        const updatedRule = { ...rule, enabled: !rule.enabled };
        await UpdateEnabledRule(updatedRule.id, updatedRule.enabled);
        setRules((prevRules) =>
            prevRules.map((r) => (r.id === rule.id ? updatedRule : r))
        );
    };

    const handleShowTimeWindow = (ruleId: string) => {
        setShowTimeWindow((prev) => (prev === ruleId ? null : ruleId));
    };

    const handleTimeChange = (
        ruleId: string,
        field: 'startTime' | 'endTime',
        value: string
    ) => {
        setTimeWindows((prev) => ({
            ...prev,
            [ruleId]: {
                ...prev[ruleId],
                [field]: value,
            },
        }));
    };

    const handleDayToggle = (ruleId: string, day: string) => {
        setTimeWindows((prev) => {
            const currentDays = prev[ruleId].days;
            const updatedDays = currentDays.includes(day)
                ? currentDays.filter((d) => d !== day)
                : [...currentDays, day];

            return {
                ...prev,
                [ruleId]: {
                    ...prev[ruleId],
                    days: updatedDays,
                },
            };
        });
    };

    return (
        <div className="container mx-auto overflow-scroll p-6">
            <h1 className="mb-6 text-center text-3xl font-semibold text-gray-800">
                Manage Rules
            </h1>
            <div className="flex flex-col gap-6">
                {rules.map((rule) => (
                    <div key={rule.id}>
                        <div className="rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
                            <div className="px-6 py-5">
                                <div>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                                        {rule?.name}
                                    </h3>
                                    <p className="line-clamp-2 text-sm text-gray-500">
                                        {rule?.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                                <div className="flex items-center">
                                    <span className="mr-2 text-sm font-medium text-gray-700">
                                        Enabled
                                    </span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            checked={rule.enabled}
                                            onChange={() => handleToggle(rule)}
                                            className="peer sr-only"
                                        />
                                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() =>
                                            handleShowTimeWindow(rule.id)
                                        }
                                        className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
                                        aria-label="View History"
                                    >
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="text-gray-500 hover:text-gray-700"
                                            size="sm"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(rule)}
                                        className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
                                        aria-label="Edit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="text-gray-500 hover:text-gray-700"
                                            size="sm"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(rule)}
                                        className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
                                        aria-label="Delete"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-gray-500 hover:text-gray-700"
                                            size="sm"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {selectedRule?.id === rule.id && (
                            <div className="mt-2 rounded-lg border bg-white p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Blocked Words for {selectedRule.name}
                                </h2>
                                <ul className="mt-2 list-disc pl-5">
                                    {blockedWords.map((word, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700"
                                        >
                                            {word}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {showTimeWindow === rule.id && timeWindows[rule.id] && (
                            <div className="mt-2 rounded-lg border bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-lg font-semibold text-gray-800">
                                    Time Window for {rule.name}
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Start Time
                                            </label>
                                            <input
                                                type="time"
                                                value={
                                                    timeWindows[rule.id]
                                                        .startTime
                                                }
                                                onChange={(e) =>
                                                    handleTimeChange(
                                                        rule.id,
                                                        'startTime',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                End Time
                                            </label>
                                            <input
                                                type="time"
                                                value={
                                                    timeWindows[rule.id].endTime
                                                }
                                                onChange={(e) =>
                                                    handleTimeChange(
                                                        rule.id,
                                                        'endTime',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Active Days
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {daysOfWeek.map((day) => (
                                                <button
                                                    key={day}
                                                    onClick={() =>
                                                        handleDayToggle(
                                                            rule.id,
                                                            day
                                                        )
                                                    }
                                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                                        timeWindows[
                                                            rule.id
                                                        ].days.includes(day)
                                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {day.slice(0, 3)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
