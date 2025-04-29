import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

const EmailSettingsForm = ({ emailSetings }: any) => {

    const { data, setData, post, processing, errors } = useForm({
        email_from: emailSetings.email_from ?? '',
        mail_host: emailSetings.mail_host ?? '',
        mail_port: emailSetings.mail_port ?? '',
        mail_username: emailSetings.mail_username ?? '',
        mail_password: emailSetings.mail_password ?? '',
    })

    const handleSubmit = () => {
        post(route('options.saveEmailSetting.save'), {
            onSuccess: () => {
                toast.success('Email Settings Saved Successfully');
            }
        });
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                <Label>From Email</Label>
                <Input
                    defaultValue={data.email_from}
                    placeholder="Eg:shop@example.com"
                    onChange={(e) => setData('email_from', e.target.value)}
                />
                {errors && <p className="text-sm text-danger">{errors.email_from}</p>}
            </div>
            <div className="grid gap-4">
                <Label>Mail Host</Label>
                <Input
                    defaultValue={data.mail_host}
                    placeholder="Enter your mail host"
                    onChange={(e) => setData('mail_host', e.target.value)}
                />
                {errors && <p className="text-sm text-danger">{errors.mail_host}</p>}
            </div>
            <div className="grid gap-4">
                <Label>Mail Port</Label>
                <Input
                    defaultValue={data.mail_port}
                    placeholder="Enter your mail port"
                    onChange={(e) => setData('mail_port', e.target.value)}
                />
                {errors && <p className="text-sm text-danger">{errors.mail_port}</p>}
            </div>
            <div className="grid gap-4">
                <Label>Mail Username</Label>
                <Input
                    defaultValue={data.mail_username}
                    placeholder="Enter your mail username"
                    onChange={(e) => setData('mail_username', e.target.value)}
                />
                {errors && <p className="text-sm text-danger">{errors.mail_username}</p>}
            </div>
            <div className="grid gap-4">
                <Label>Mail Password</Label>
                <Input
                    defaultValue={data.mail_password}
                    placeholder="Enter your mail password"
                    onChange={(e) => setData('mail_password', e.target.value)}
                />
                {errors && <p className="text-sm text-danger">{errors.mail_password}</p>}
            </div>
            <div className="grid-4">
                <Button onClick={handleSubmit} disabled={processing}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default EmailSettingsForm;
