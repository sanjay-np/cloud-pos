import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, FlexboxGrid, Input, InputGroup, Panel } from 'rsuite';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, User2Icon } from 'lucide-react';
import { useState } from 'react';

export default function Register() {

    const [visible, setVisible] = useState(false);
    const handleChange = () => {
        setVisible(!visible);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="register-page">
                <FlexboxGrid align='middle' className='register-container'>
                    <FlexboxGrid.Item colspan={16} className='left-section'>

                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8} className="right-section">
                        <Panel bordered className="register-form-wrapper" title='Register'>
                            <form onSubmit={submit}>
                                <div className='form-item'>
                                    <InputGroup inside>
                                        <InputGroup.Addon>
                                            <User2Icon strokeWidth={1.5} size={20} />
                                        </InputGroup.Addon>
                                        <Input
                                            placeholder='Name...'
                                            value={data.name}
                                            autoComplete="name"
                                            onChange={(val) => { setData('name', val) }}
                                            required
                                        />
                                    </InputGroup>
                                    <InputError message={errors.name} />
                                </div>

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
                                            required
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
                                            required
                                        />
                                        <InputGroup.Button onClick={handleChange}>
                                            {visible ? <EyeIcon strokeWidth={1.5} size={20} /> : <EyeOffIcon strokeWidth={1.5} size={18} />}
                                        </InputGroup.Button>
                                    </InputGroup>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="form-item">
                                    <InputGroup inside>
                                        <InputGroup.Addon>
                                            <LockIcon strokeWidth={1.5} size={20} />
                                        </InputGroup.Addon>
                                        <Input
                                            type={visible ? 'text' : 'password'}
                                            placeholder='Confirm Password...'
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={(val) => setData('password_confirmation', val)}
                                            required
                                        />
                                        <InputGroup.Button onClick={handleChange}>
                                            {visible ? <EyeIcon strokeWidth={1.5} size={18} /> : <EyeOffIcon strokeWidth={1.5} size={18} />}
                                        </InputGroup.Button>
                                    </InputGroup>
                                    <InputError message={errors.password_confirmation} />
                                </div>
                                <div className="form-item">
                                    <Button
                                        appearance='primary'
                                        block
                                        disabled={processing}
                                        loading={processing}
                                        type='submit'
                                    >
                                        Register
                                    </Button>
                                </div>

                                <div className="form-item">
                                    <Link href={route('login')} className="">
                                        Already registered?
                                    </Link>
                                </div>
                            </form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        </GuestLayout>
    );
}
