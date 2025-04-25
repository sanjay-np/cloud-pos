import { useModelStore } from '@/hooks/use-model';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type AppModalProps = {
    isOpen: boolean;
    closeModel: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
    handleSubmit?: () => void;
}

export function AppModal({ isOpen, closeModel, title, description, children, handleSubmit }: AppModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={closeModel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className='p-4'>{children}</div>
            </DialogContent>
            <DialogFooter>
                <Button onClick={closeModel}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit}>Save changes</Button>
            </DialogFooter>
        </Dialog>
    );
}
