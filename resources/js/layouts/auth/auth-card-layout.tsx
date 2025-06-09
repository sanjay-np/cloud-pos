import AppLogoIcon from '@/components/app/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Card className="rounded-sm">
                        <CardHeader className="px-8 pt-4 pb-0">
                            <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                                <div className="flex items-center justify-center gap-2">
                                    <AppLogoIcon className="size-14 fill-current text-primary dark:text-white" />
                                    <div className='flex flex-col'>
                                        <span className="text-2xl font-semibold text-primary">Cloud Software</span>
                                        <span className='text-sm text-muted-foreground text-left'>POS Application</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="pt-6 flex flex-col">
                                <CardTitle className="text-xl">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 py-6">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
