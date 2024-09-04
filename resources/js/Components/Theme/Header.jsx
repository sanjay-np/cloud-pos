import { AlignLeftIcon, BellDotIcon, BellIcon, ChevronDownIcon, GripIcon, LanguagesIcon, LogOutIcon, MessageSquareTextIcon, SearchIcon, Settings2Icon, SunIcon, User2Icon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link } from '@inertiajs/react'
import { PopOver } from './PopOver'

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className='main-header'>
            <div className="header-wrapper">
                <div className="left-item">
                    <div className="toggle-section">
                        <AlignLeftIcon color='gray' />
                    </div>
                    <div className="search-section">
                        <div className="input-wrapper">
                            <input type="text" placeholder='Search...' />
                            <span className='icon'><SearchIcon color='gray' strokeWidth={1.5} /></span>
                        </div>
                    </div>
                </div>
                <div className="right-item">
                    <div className="notification-section">
                        <BellIcon color='gray' />
                    </div>
                    <div className="message-section">
                        <MessageSquareTextIcon color='gray' />
                    </div>
                    <div className="divider"></div>
                    <div className="language-section">
                        <LanguagesIcon color='gray' />
                    </div>
                    <div className="mode-section">
                        <SunIcon color='gray' />
                    </div>
                    <div className="divider"></div>
                    <div className="user-section">
                        <div className="avatar-wrapper">
                            <PopOver open={open} setOpen={setOpen} containerClass={'user-popover-container'}>
                                <PopOver.Trigger>
                                    <button className='flex gap-1 items-center'>
                                        <img src="/assets/images/avatar/2.jpg" alt="user avatar" />
                                        <ChevronDownIcon color='gray' size={20} />
                                    </button>
                                </PopOver.Trigger>
                                <PopOver.Content>
                                    <ul className='user-menu'>
                                        <li>
                                            <Link href={route('profile.edit')}>
                                                <User2Icon size={20} color='gray' />
                                                <span>My Account</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <Settings2Icon size={20} color='gray' />
                                                <span>Settings</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('logout')} method="post" as="button">
                                                <LogOutIcon size={20} color='gray' />
                                                <span>Log Out</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </PopOver.Content>
                            </PopOver>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className='app-section'>
                        <GripIcon color='gray' />
                    </div>
                </div>
            </div>
        </header>
    )
}
