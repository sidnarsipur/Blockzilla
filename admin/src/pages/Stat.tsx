import { useEffect, useState } from 'react';
import { DeleteRule, GetRules } from '../lib/admin/data';
import { Rule } from '../lib/util/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Stat() {
    const [rules, setRules] = useState<Rule[]>([]);

    useEffect(() => {
        async function fetchRules() {
            const fetchedRules = await GetRules();
            setRules(fetchedRules);
        }

        fetchRules();
    }, []);

    const handleEdit = (rule: Rule) => {
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
        <div className="container mx-auto p-6">
            <h1
                className="mb-6 text-center text-3xl font-semibold text-gray-800"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                Manage Rules
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rules.map((rule) => (
                    <div
                        key={rule.id}
                        className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg"
                    >
                        <div className="px-6 py-5">
                            <div>
                                {' '}
                                {/* No more flex here in the header */}
                                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                                    {rule?.name}
                                </h3>
                                <p className="line-clamp-2 text-sm text-gray-500">
                                    {rule?.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                            {' '}
                            {/* Flex container for bottom section */}
                            <div className="flex items-center">
                                {' '}
                                {/* Grouping "Enabled" and toggle */}
                                <span className="mr-2 text-sm font-medium text-gray-700">
                                    {' '}
                                    {/* Added margin-right for spacing */}
                                    Enabled
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={rule.enabled}
                                        onChange={() => handleToggle(rule)}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                </label>
                            </div>
                            <div className="flex space-x-2">
                                {' '}
                                {/* Icons on the right side */}
                                <button
                                    onClick={() => handleEdit(rule)}
                                    className="rounded-md p-2 transition-colors hover:bg-gray-100"
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
                                    className="rounded-md p-2 transition-colors hover:bg-gray-100"
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
                ))}
            </div>
        </div>
    );
}
