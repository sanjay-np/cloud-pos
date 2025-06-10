import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square items-center justify-center rounded-md dark:bg-gray-800">
                <AppLogoIcon className="size-8 fill-current text-gray-500 dark:text-white" />
            </div>
            <div className="ml-1 flex-1 text-left text-base hidden">
                <span className="mb-0.5 truncate leading-none font-semibold">Cloud Software</span>
                <span className="text-xs text-muted-foreground">POS Application</span>
            </div>
        </>
    );
}
