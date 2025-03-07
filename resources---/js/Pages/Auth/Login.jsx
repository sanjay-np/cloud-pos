import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Checkbox, FlexboxGrid, Input, InputGroup, Panel } from 'rsuite';
import { CommandIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, User2Icon } from 'lucide-react';
import { useState } from 'react';;

export default function Login({ status, canResetPassword }) {

    const [visible, setVisible] = useState(false);
    const handleChange = () => {
        setVisible(!visible);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="login-page">
                <FlexboxGrid align='middle' className='login-container'>
                    <FlexboxGrid.Item colspan={16} className='left-section'>
                        <div className="flex flex-col justify-between h-screen">
                            <div className="text-white m-6 flex items-center gap-2">
                                <CommandIcon strokeWidth={1.5} size={40} color='#fff' />
                                <span className='font-semibold text-2xl'>Application Inc</span>
                            </div>
                            <div className='text-white max-w-screen-md p-6'>
                                <blockquote className="space-y-2">
                                    <p className="text-lg">
                                        “This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”
                                    </p>
                                    <footer className="text-sm">Sofia Davis</footer>
                                </blockquote>
                            </div>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8} className="right-section">
                        <Panel bordered className="login-form-wrapper" title='Register'>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                            <form onSubmit={submit}>
                                <div className="form-item">
                                    <InputGroup inside>
                                        <InputGroup.Addon>
                                            <MailIcon strokeWidth={1.5} size={20} />
                                        </InputGroup.Addon>
                                        <Input
                                            placeholder='Email Address...'
                                            type="email"
                                            value={data.email}
                                            autoComplete="username"
                                            onChange={(val) => setData('email', val)}
                                        />
                                    </InputGroup>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="form-item">
                                    <InputGroup inside>
                                        <InputGroup.Addon>
                                            <LockIcon strokeWidth={1.5} size={20} />
                                        </InputGroup.Addon>
                                        <Input
                                            type={visible ? 'text' : 'password'}
                                            placeholder='Password...'
                                            value={data.password}
                                            autoComplete="new-password"
                                            onChange={(val) => setData('password', val)}
                                        // required
                                        />
                                        <InputGroup.Button onClick={handleChange}>
                                            {visible ? <EyeIcon strokeWidth={1.5} size={20} /> : <EyeOffIcon strokeWidth={1.5} size={20} />}
                                        </InputGroup.Button>
                                    </InputGroup>
                                    <InputError message={errors.password} />
                                </div>
                                <div className="form-item row">
                                    <label className="flex items-center">
                                        <Checkbox
                                            defaultChecked={data.remember}
                                            onChange={(val) => setData('remember', val)}
                                        />
                                        <span className="checkbox-txt">Remember me</span>
                                    </label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')}>Forgot password?</Link>
                                    )}
                                </div>

                                <div className="form-item">
                                    <Button
                                        appearance='primary'
                                        block
                                        disabled={processing}
                                        loading={processing}
                                        type='submit'
                                    >
                                        Sign In
                                    </Button>
                                </div>

                                <div className="register-link">
                                    <Link href={route('register')}>Not registered yet?</Link>
                                </div>
                            </form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        </GuestLayout>
    );
}
