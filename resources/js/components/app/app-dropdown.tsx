import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';

export type Option = {
    value: string;
    label: string;
};

export interface CommandDropdownProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    initialOptions: Option[];
}

export function AppDropdown({
    value = '',
    onChange,
    placeholder = 'Select',
    className = 'w-[200px]',
    disabled = false,
    initialOptions = [],
}: CommandDropdownProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [options, setOptions] = React.useState<Option[]>(initialOptions);
    const [loading, setLoading] = React.useState(false);

    // Simulate remote search
    const fetchOptions = React.useCallback(async (searchTerm: string) => {
        setLoading(true);
        try {
            // Simulate API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Mock remote data based on search term
            const remoteOptions: Option[] = [
                { value: 'nuxt', label: 'Nuxt.js' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'angular', label: 'Angular' },
                { value: 'ember', label: 'Ember.js' },
                { value: 'preact', label: 'Preact' },
                { value: 'solid', label: 'SolidJS' },
            ].filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
            const paginatedOptions = remoteOptions.slice(0);
            setOptions([...paginatedOptions]);
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Trigger search when input changes
    React.useEffect(() => {
        if (search.trim()) {
            fetchOptions(search);
        } else {
            setOptions(initialOptions);
        }
    }, [search, fetchOptions]);

    // Handle selection
    const handleSelect = (currentValue: Option) => {
        if (onChange) {
            onChange(currentValue.value === value ? '' : currentValue);
        }
        setOpen(false);
    };

    // Get the selected option label
    const selectedLabel = React.useMemo(() => {
        return value ? options.find((option) => option.value === value)?.label || value : '';
    }, [value, options]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={className + ' text-muted-foreground justify-between font-normal'}
                    disabled={disabled}
                >
                    {selectedLabel || placeholder}
                    <Icon name="CaretUpDownIcon" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={className + ' p-0'} align="start">
                <Command>
                    <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} value={search} onValueChange={setSearch} />
                    <CommandList>
                        {options.length === 0 && !loading && <CommandEmpty>No results found.</CommandEmpty>}
                        <CommandGroup>
                            {options
                                .filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
                                .map((option) => {
                                    return (
                                        <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option)}>
                                            <Icon name="CheckIcon" className={`mr-2 h-4 w-4 ${value === option.value ? 'opacity-100' : 'opacity-0'}`} />
                                            {option.label}
                                        </CommandItem>
                                    );
                                })}
                        </CommandGroup>

                        {/* Loading indicator */}
                        {loading && (
                            <div className="px-2 py-2 text-center">
                                <Icon name="SpinnerIcon" className="mx-auto h-4 w-4 animate-spin" />
                                <p className="text-muted-foreground mt-1 text-xs">Loading options...</p>
                            </div>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
