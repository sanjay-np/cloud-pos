import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useSheetStore } from "@/hooks/use-sheet";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

type AppSheetProps = {
    title: string;
    subTitle?: string;
    children: ReactNode,
    processing?: boolean,
    width?: ClassNameValue
    onConfirm?: () => void,
}

const AppSheet = ({
    title,
    subTitle,
    children,
    processing,
    width,
    onConfirm,
}: AppSheetProps) => {

    const { isOpen, closeSheet } = useSheetStore();

    return (
        <Sheet open={isOpen} onOpenChange={closeSheet}>
            <SheetContent className={cn("sm:max-w-[420px] overflow-y-scroll", width)} disableOutsideClick>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {subTitle && (
                        <SheetDescription>
                            {subTitle}
                        </SheetDescription>
                    )}
                </SheetHeader>
                {children}
                <SheetFooter>
                    <div className="grid grid-cols-2 gap-2">
                        <SheetClose asChild>
                            <Button variant={"outline"}>Close</Button>
                        </SheetClose>

                        {onConfirm && (
                            <Button
                                variant={"default"}
                                type="submit"
                                onClick={onConfirm}
                                disabled={processing}
                            >
                                {processing && <Loader2Icon className="animate-spin" />}
                                Submit
                            </Button>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default AppSheet