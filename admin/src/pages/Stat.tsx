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
        // Implement edit functionality here
        console.log('Edit rule:', rule);
    };

    const handleDelete = async (rule: Rule) => {
        await DeleteRule(rule.id);
        setRules((prevRules) => prevRules.filter((r) => r.id !== rule.id));
        console.log('Delete rule:', rule);
    };

    return (
        <div className="container mx-auto p-4">
            <h1
                className="mb-6 text-center text-4xl font-extrabold text-blue-700"
                style={{ fontFamily: 'Arial, sans-serif' }}
            >
                Rules for Max
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rules.map((rule, index) => (
                    <div
                        key={index}
                        className="relative transform rounded-lg bg-white p-6 shadow-xl transition duration-500 hover:scale-105 hover:shadow-2xl"
                    >
                        <h3 className="mb-2 text-xl font-bold text-blue-600">
                            {rule?.name}
                        </h3>
                        <p className="text-gray-700">{rule?.description}</p>
                        <div className="absolute right-4 top-4 flex space-x-4">
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="cursor-pointer text-blue-600 hover:text-blue-800"
                                onClick={() => handleEdit(rule)}
                                size="lg"
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="cursor-pointer text-red-600 hover:text-red-800"
                                onClick={() => handleDelete(rule)}
                                size="lg"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
