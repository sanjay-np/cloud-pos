import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

type AppModalProps = {
    isOpen: boolean;
    closeModel: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
    handleSubmit?: () => void;
};

export const AppModal = ({ isOpen, closeModel, title, description, children, handleSubmit }: AppModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={closeModel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">{children}</div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
