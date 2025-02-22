import { useEffect, useState } from 'react';
import { GetRules } from '../lib/admin/data';
import { Rule } from '../lib/util/model';

export default function Stat() {
    const [rules, setRules] = useState<Rule[]>([]);

    useEffect(() => {
        async function fetchRules() {
            const fetchedRules = await GetRules();
            setRules(fetchedRules);
        }

        fetchRules();
    }, []);

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
                        className="transform rounded-lg bg-white p-6 shadow-lg transition duration-500 hover:scale-105"
                    >
                        <h3 className="mb-2 text-xl font-bold text-blue-600">
                            {rule?.name}
                        </h3>
                        <p className="text-gray-700">{rule?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
