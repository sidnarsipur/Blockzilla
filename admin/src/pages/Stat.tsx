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
                className="mb-8 text-center text-4xl font-extrabold text-blue-700"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                Rules for Max
            </h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rules.map((rule) => (
                    <div
                        key={rule.id}
                        className="relative transform overflow-hidden rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="mb-2 text-xl font-semibold text-blue-600">
                                    {rule?.name}
                                </h3>
                                <p className="mb-4 text-sm text-gray-600">
                                    {rule?.description}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="cursor-pointer text-blue-500 transition duration-300 hover:text-blue-700"
                                    onClick={() => handleEdit(rule)}
                                    size="lg"
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer text-red-500 transition duration-300 hover:text-red-700"
                                    onClick={() => handleDelete(rule)}
                                    size="lg"
                                />
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                                Enabled
                            </span>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    checked={rule.enabled}
                                    onChange={() => handleToggle(rule)}
                                    className="peer sr-only"
                                />
                                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
