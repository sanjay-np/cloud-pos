import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { HTMLAttributes } from 'react';
import Icon from '@/components/ui/icon';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Icon name="MoonIcon" className="h-5 w-5" />;
            case 'light':
                return <Icon name="SunIcon" className="h-5 w-5" />;
            default:
                return <Icon name="MonitorIcon" className="h-5 w-5" />;
        }
    };

    return (
        <div className={className} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                        {getCurrentIcon()}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateAppearance('light')}>
                        <span className="flex items-center gap-2">
                            <Icon name="SunIcon" className="h-5 w-5" />
                            Light
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                        <span className="flex items-center gap-2">
                            <Icon name="MoonIcon" className="h-5 w-5" />
                            Dark
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('system')}>
                        <span className="flex items-center gap-2">
                            <Icon name="MonitorIcon" className="h-5 w-5" />
                            System
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
