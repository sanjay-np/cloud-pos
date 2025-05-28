import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center">
                <AppLogoIcon className="size-8 fill-current text-gray-500 dark:text-black" />
            </div>
        </>
    );
}
