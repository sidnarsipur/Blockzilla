import { useEffect, useState } from 'react';
import { DeleteRule, GetRules, GetBlockedWordsByRule } from '../lib/admin/data';
import { Rule } from '../lib/util/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Stat() {
    const [rules, setRules] = useState<Rule[]>([]);
    const [blockedWords, setBlockedWords] = useState<string[]>([]);
    const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

    useEffect(() => {
        async function fetchRules() {
            const fetchedRules = await GetRules();
            setRules(fetchedRules);
        }

        fetchRules();
    }, []);

    const handleEdit = async (rule: Rule) => {
        if (selectedRule?.id === rule.id) {
            setSelectedRule(null);
            setBlockedWords([]);
        } else {
            const words = await GetBlockedWordsByRule(rule.id); // Pass the rule ID to fetch specific blocked words
            setBlockedWords(words);
            setSelectedRule(rule);
        }
        console.log('Edit rule:', rule);
    };

    const handleDelete = async (rule: Rule) => {
        await DeleteRule(rule.id);
        setRules((prevRules) => prevRules.filter((r) => r.id !== rule.id));
        console.log('Delete rule:', rule);
    };

    const handleToggle = (rule: Rule) => {
        const updatedRules = rules.map((r) =>
            r.id === rule.id ? { ...r, enabled: !r.enabled } : r
        );
        setRules(updatedRules);
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
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(rule)}
                                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-100"
                                        aria-label="Edit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="mr-1 text-gray-500 hover:text-gray-700"
                                            size="sm"
                                        />
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="text-gray-500 hover:text-gray-700"
                                            size="sm"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(rule)}
                                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-100"
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
                    </div>
                ))}
            </div>
        </div>
    );
}
