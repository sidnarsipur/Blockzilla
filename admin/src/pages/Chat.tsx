import { useState } from 'react';
import { Button } from '../components/ui/button';
import { AudioLines, Send } from 'lucide-react';

export default function Chat() {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', inputValue);
        // Here you would typically send the input to an API or handle it as needed
    };

    return (
        <div className="flex grow flex-col">
            <form
                onSubmit={handleSubmit}
                className="mt-auto flex w-full flex-row items-center gap-2 p-5"
            >
                <div className="flex grow items-center rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus:outline-none">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Please help me with..."
                        className="flex-1 rounded-l-lg p-3 focus:outline-none"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <AudioLines />
                    </Button>
                </div>
                <Button
                    type="submit"
                    variant="outline"
                    size="round-icon"
                    className="color-white bg-blue-600"
                >
                    <Send />
                </Button>
            </form>
        </div>
    );
}
