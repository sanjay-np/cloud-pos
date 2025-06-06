import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center bg-white rounded-md dark:bg-gray-800">
                <AppLogoIcon className="size-8 fill-current text-gray-500 dark:text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-base">
                <span className="mb-0.5 truncate leading-none font-semibold">Cloud Software</span>
                <span className="text-xs text-muted-foreground">POS Application</span>
            </div>
        </>
    );
}
